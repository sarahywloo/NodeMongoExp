"use strict"

var mongoose = require('mongoose');

var samplesSchema =  mongoose.Schema({
  text: String,
  dateTime: Date,
});

var Samples = mongoose.model('samples', samplesSchema);
module.exports = Samples;