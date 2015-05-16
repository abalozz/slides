var UserService = require('../services/user');

module.exports = {

  getUser: function (req, res) {
    UserService.getUserByUsername(req.params.user, function (err, user) {
      if (err) { return next(err); }

      if (user) {
        res.render('user/profile', { user: user });
      } else {
        res.send('El usuario no existe');
      }
    });
  },

  showProfile: function (req, res) {
    res.render('user/edit', {user: req.user});
  },

  updateProfile: function (req, res) {
    req.user.username = req.body.username;
    req.user.save(function (err) {
      if (err) { return next(err); }
      
      res.redirect('/@' + req.user.username);
    });
  }

};
