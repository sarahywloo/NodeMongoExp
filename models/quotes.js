"use strict"

var mongoose = require('mongoose');

var quotesSchema =  mongoose.Schema({
  text: String,
  author: String,
});

var Quotes = mongoose.model('quotes', quotesSchema);
module.exports = Quotes;