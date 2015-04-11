'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RegisterSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Register', RegisterSchema);