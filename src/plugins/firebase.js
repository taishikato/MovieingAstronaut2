import firebase from "firebase"

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCxvJ93wJh36Fmf9XWowswd-TtEqkH6318",
    authDomain: "movieingastronaut.firebaseapp.com",
    databaseURL: "https://movieingastronaut.firebaseio.com",
    projectId: "movieingastronaut",
    storageBucket: "movieingastronaut.appspot.com",
    messagingSenderId: "138167356960"
  })
}
export default firebase
