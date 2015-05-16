module.exports = {

  home: function (req, res) {
    var username;
    
    if (req.auth) {
      username = req.user.username;
    }
    res.render('public/index', {username: username});
  }

};
