var User = require('../models/user');

var UserService = function () {};

UserService.prototype.getUserByUsername = function (username, next) {
  User.findOne({
    username: username
  })
  .populate('keynotes')
  .exec(next);
};

module.exports = new UserService();
