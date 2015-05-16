var SlideService = require('../services/slide');

module.exports = {

  create: function (req, res, next) {

    SlideService.createSlide({
      keynoteId: req.body.keynoteId,
    }, function (err, keynote) {
      if (err) { return next(err); }

      res.redirect('/@' + req.user.username + '/' + keynote.slug + '/edit');
    });

  },

  update: function (req, res, next) {

    SlideService.updateSlide({
      slideId: req.params.slideId,
      content: req.body.content
    }, function (err) {
      if (err) { return next(err); }

      res.redirect('/@' + req.user.username + '/' + req.body.keynoteSlug + '/edit');
    });

  },

  remove: function (req, res, next) {

    SlideService.deleteSlide(req.params.slideId, function (err, slide) {
      if (err) { return next(err); }

      res.redirect('/@' + req.user.username + '/' + req.body.keynoteSlug + '/edit');
    });

  }

};
