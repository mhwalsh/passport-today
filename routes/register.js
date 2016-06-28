var express = require('express');
var router = express.Router();

var path = require('path');

// fulfills get requests at /register
router.get('/', function(req, res) {
  res.sendFile(path.resolve('public/views/register.html'));
});

// fulfills posts requests at /register
router.post('/', function(req, res) {
  console.log('hit register post route');
  console.log('username = ', req.body.username);
  console.log('password = ', req.body.password);

  //connect to the database!!

  res.sendStatus(200);
});

module.exports = router;
