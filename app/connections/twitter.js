var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/user');
var config = require('../config');

var twitterConnection = function () {
  passport.use(new TwitterStrategy({
      consumerKey: config.TWITTER_CONSUMER_KEY,
      consumerSecret: config.TWITTER_CONSUMER_SECRET,
      callbackURL: config.TWITTER_CALLBACK
    },
    function(token, tokenSecret, profile, done) {
      User.findOne({
        twitter: { id: profile.id }
      }, function (err, user) {
        if (err) {
          done(err, null);
        }

        if (!user) {
          user = new User({
            username: profile.username,
            twitter: { id: profile.id }
          });
          user.save(function (err) {
            if (err) {
              done(err, null);
            }
            done(null, user);
          });
        } else {
          done(null, user);
        }
      });
    }
  ));

  return {
    authenticate: passport.authenticate('twitter'),
    callback: passport.authenticate('twitter', {
      failureRedirect: '/'
    })
    // callback: passport.authenticate('twitter', {
    //   successRedirect: '/private',
    //   failureRedirect: '/'
    // })
  };
};

module.exports = twitterConnection();
