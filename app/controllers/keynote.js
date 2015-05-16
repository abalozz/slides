var KeynoteService = require('../services/keynote');

module.exports = {

  create: function (req, res, next) {

    KeynoteService.createKeynote({
      name: req.body.name,
      user: req.user
    }, function (err, keynote) {
      if (err) { return next(err); }
      res.redirect('/@' + req.user.username + '/' + keynote.slug + '/edit');
    });

  },

  show: function (req, res, next) {

    KeynoteService.getKeynoteByUserAndSlug(
      req.params.user,
      req.params.keynote,
      function (err, keynote) {
        if (err) { return next(err); }
        res.render('keynote/keynote', { keynote: keynote });
      });

  },

  showLive: function (req, res, next) {

    KeynoteService.getKeynoteByUserAndSlug(
      req.params.user,
      req.params.keynote,
      function (err, keynote) {
        if (err) { return next(err); }

        var isSpeaker = 0;
        if (req.user && req.user._id.toString() === keynote.user.toString()) {
          isSpeaker = 1;
        }

        res.render('keynote/live-keynote', { keynote: keynote, isSpeaker: isSpeaker });

      });

  },

  showControls: function (req, res, next) {

    KeynoteService.getKeynoteByUserAndSlug(
      req.params.user,
      req.params.keynote,
      function (err, keynote) {
        if (err) { return next(err); }

        var isSpeaker = 0;
        if (req.user && req.user._id.toString() === keynote.user.toString()) {
          isSpeaker = 1;
        }

        res.render('keynote/live-controls', {
          keynote: keynote,
          isSpeaker: isSpeaker,
          totalSlides: keynote.slides.length
          });

      });

  },

  edit: function (req, res, next) {

    KeynoteService.getKeynoteByUserAndSlug(
      req.params.user,
      req.params.keynote,
      function (err, keynote) {
        if (err) { return next(err); }

        return res.render('keynote/edit', { keynote: keynote });
      });

  },

  update: function (req, res, next) {

    KeynoteService.updateKeynote({
      id: req.params.keynoteId,
      name: req.body.name,
      slug: req.body.slug,
    }, function (err, keynote) {
      if (err) { return next(err); }

      res.redirect('/@' + req.user.username + '/' + keynote.slug + '/edit');
    });

  },

  remove: function (req, res, next) {

    KeynoteService.deleteKeynote(req.params.keynoteId, function (err, keynote) {
      if (err) { return next(err); }

      res.redirect('/@' + req.user.username);
    });

  }

};
