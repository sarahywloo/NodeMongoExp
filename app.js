var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var mongoose = require('mongoose');
var request = require('request');

var index = require('./routes/index');
// var users = require('./routes/users');

// where app gets started
var app = express();

// andrewTinkers2 is the name of the database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/andrewTinkers2').then(
  () => {
    console.log('connected to Mongo DB successfully');
  },
  err => {
    console.log('connection failed. Error: ${err}');
  }
); 

// view engine setup
// adding default views to the views dir
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// tell code to use our routes here
// the '/' means ALL request paths
app.use('/', index);
// app.use('/users', users);

var guests = require('./models/guests.js');

app.post('/test', function(req, res){
  guests.create({
    clientIP: 'sarahtests',
    dateTime: Date(),
    value: 'Y',
    custom: 'just testing custom text',
  }, function(err, guestsObj){
    if (err) {
      throw err;
    }
    res.json(guestsObj);
  });
});

app.get('/guest', function(req, res){
  guests.find(function(err, guestsObj){
    res.send(guestsObj);
  });
  console.log(req.query);
});

var quoteApi = 'https://api.forismatic.com/api/1.0/?&method=getQuote&format=json&lang=en';
var quotes = require('./models/quotes.js');
var samples = require('./models/samples.js');

app.get('/quote', function(req, res){
  request.get(quoteApi, function (error, res, body){
    let json = JSON.parse(body);
    // res.send(body); 
    quotes.create({
      text: json.quoteText,
      author: json.quoteAuthor,
    }, function(err, quoteObj){
      if(err){
        throw err;
      }
      // res.json(quoteObj);
      samples.create({
        text: json.quoteText,
        dateTime: Date(),
      }, function(err, quoteObj){
        if(err){
          throw err;
        }
      });
    })
    return console.log('json:', json);
  });
})
// request.get(quoteApi, function (error, res, body){
//   let json = JSON.parse(body);
//   // res.send(body); 
//   return console.log('json:', json);
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
