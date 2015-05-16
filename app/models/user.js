var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Keynote = require('./keynote');

var userSchema = Schema({
  username: { type: String, required: true },
  twitter: {
    id: String
  },
  keynotes: [{ type: Schema.Types.ObjectId, ref: 'Keynote' }]
  // keynotes: [Keynote.schema]
});

userSchema.methods.hello = function () {
  return 'Hello, I\'m ' + this.username;
};

module.exports = mongoose.model('User', userSchema);
