const setMaData = (req, res, next) => {
  req.maData = {}
  next();
}

module.exports = setMaData;