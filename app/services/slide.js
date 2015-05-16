var Keynote = require('../models/keynote');
var Slide = require('../models/slide');

var SlideService = function () {};

SlideService.prototype.createSlide = function (slideData, next) {

  Keynote
  .findById(slideData.keynoteId)
  .exec(function (err, keynote) {
    if (err) { return next(err); }

    var newSlide = new Slide({
      content: slideData.content || '',
      order: keynote.slides.length + 1,
      keynote: keynote._id
    });

    newSlide.save(function (err) {
      if (err) { return next(err); }

      keynote.slides.push(newSlide);
      keynote.save(function (err) {
        return next(err, keynote);
      });
    });

  });

};

SlideService.prototype.updateSlide = function (slideData, next) {

  Slide
  .findById(slideData.slideId)
  .exec(function (err, slide) {
    if (err) { return next(err); }

    slide.content = slideData.content;
    slide.save(function (err) {
      return next(err, slide);
    });
  });

};

SlideService.prototype.deleteSlide = function (id, next) {
  Slide.findByIdAndRemove(id).exec(next);
};

module.exports = new SlideService();
