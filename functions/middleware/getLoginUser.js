const admin = require('firebase-admin');

let loginUser;
const validateFirebaseIdToken = async req => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !(req.cookies && req.cookies.__session)) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>',
        'or by passing a "__session" cookie.');
    return false;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if(req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    return false;
  }
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log('ID Token correctly decoded', decodedIdToken);
    return decodedIdToken;
  } catch(err) {
    console.error('Error while verifying Firebase ID token:', error);
    return false;
  }
};

const getLoginUser = (req, res, next) => {
  (async () => {
    req.isLogin = false;
    // Validate if user is valid
    const validationResult = await validateFirebaseIdToken(req);
    if (validationResult === false) return next();

    // Get user from firestore
    const userUid = validationResult.user_id;
    const firestore = admin.firestore();
    const userRef = firestore.collection('users').doc(userUid);
    try {
      const result = await userRef.get()
      if (result.exists) {
        req.maData = {}
        req.maData.isLogin = true;
        req.maData.loginUser = result.data();
      }
    } catch(err) {
      req.maData.isLogin = false;
      req.maData.loginUser = {}
    }
    return next();
  })();
};

module.exports = getLoginUser;