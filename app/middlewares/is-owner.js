module.exports = function (req, res, next) {
  if (req.user.username === req.params.user) {
    next();
  } else {
    res.status(403).send();
  }
};
