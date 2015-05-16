var passport = require('passport');
var User = require('../models/user');

module.exports = function () {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, function (err, user) {
      if (err) {
        done(err);
      }
      done(null, user);
    });
  });
};
