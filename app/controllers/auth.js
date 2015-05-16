var twitterConnection = require('../connections/twitter');

module.exports = {

  twitter: {

    authenticate: twitterConnection.authenticate,
    callback: twitterConnection.callback

  },

  redirectToProfile: function (req, res) {
    res.redirect('/@' + req.user.username);
  },

  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  }

};
