var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  facebook_id: Number,
  name: String,
  languageFrom: String,
  languageTo: String
});
var User = mongoose.model('User',userSchema);

module.exports.User = User;