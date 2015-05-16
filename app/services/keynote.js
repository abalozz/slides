var Keynote = require('../models/keynote');
var Slide = require('../models/slide');
var User = require('../models/user');

var KeynoteService = function () {};

KeynoteService.prototype.getKeynoteByUserAndSlug = function (username, keynoteSlug, next) {
  User.findOne({
    username: username
  })
  .populate({
    path: 'keynotes',
    match: { slug: keynoteSlug },
    options: { limit: 1 }
  })
  .exec(function (err, user) {
    if (err) { return next(err); }

    var keynote = user.keynotes[0];

    Keynote.populate(keynote, {
      path: 'slides'
    }, next);

  });
};

KeynoteService.prototype.createKeynote = function (keynoteData, next) {
  var user = keynoteData.user;

  var keynote = new Keynote({
    name: keynoteData.name,
    slug: keynoteData.name,
    user: user._id
  });

  var slide = new Slide({
    order: 1,
    content: keynoteData.name,
    keynote: keynote._id
  });

  slide.save(function (err) {
    if (err) { return next(err); }

    keynote.slides.push(slide);

    keynote.save(function (err) {
      if (err) { return next(err); }

      user.keynotes.push(keynote);

      user.save(function (err) {
        return next(err, keynote);
      });

    });

  });
};

KeynoteService.prototype.updateKeynote = function (keynoteData, next) {
  Keynote.findById(keynoteData.id)
  .exec(function (err, keynote) {
    if (err) { return next(err); }

    keynote.name = keynoteData.name;
    keynote.slug = keynoteData.slug;
    keynote.save(function (err) {
      return next(err, keynote);
    });
  });
};

KeynoteService.prototype.deleteKeynote = function (keynoteId, next) {
  Keynote.findByIdAndRemove(keynoteId).exec(next);
};

module.exports = new KeynoteService();
