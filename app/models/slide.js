var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var marked = require('marked');

marked.setOptions({
  sanitize: true,
});

var slideSchema = Schema({
  order: Number,
  content: String,
  keynote: { type: Schema.Types.ObjectId, ref: 'Keynote' }
});

slideSchema.virtual('markdownContent').get(function () {
  return marked(this.content);
});

module.exports = mongoose.model('Slide', slideSchema);
