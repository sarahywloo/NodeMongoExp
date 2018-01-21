var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res){
  res.send({
    clientIP: 'sarahtests',
    dateTime: Date(),
    value: 'Y',
    custom: 'just testing custom text',
  });
  console.log(req.query);
});

// Posting data
// router.post('/', function(req, res){
//   req.query.name etc
// })

module.exports = router;
