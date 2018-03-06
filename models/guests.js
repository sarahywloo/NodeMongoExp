"use strict"

var mongoose = require('mongoose');

var guestsSchema =  mongoose.Schema({
  clientIP: String,
  dateTime: Date,
  value: String,
  custom: String,
});

var Guests = mongoose.model('guests', guestsSchema);
module.exports = Guests;