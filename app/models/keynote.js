var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Slide = require('./slide');
var slugify = require('../helpers/slugify');

var keynoteSchema = Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  slides: [{ type: Schema.Types.ObjectId, ref: 'Slide' }]
  // slides: [Slide.schema]
});

keynoteSchema.methods.setName = function (name) {
  this.name = name;
  this.slug = slugify(name);
};

keynoteSchema.path('slug').set(slugify);

module.exports = mongoose.model('Keynote', keynoteSchema);
