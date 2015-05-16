module.exports = function (req, res, next) {
  if (req.auth) {
    res.redirect('/' + req.user);
  } else {
    next();
  }
};
