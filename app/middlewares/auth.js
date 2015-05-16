module.exports = function (req, res, next) {
  if (req.auth) {
    next();
  } else {
    res.redirect('/');
  }
};
