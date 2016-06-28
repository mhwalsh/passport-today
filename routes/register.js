var express = require('express');
var router = express.Router();

var path = require('path');

// fulfills requests at /register
router.get('/', function(req, res) {
  res.sendFile(path.resolve('public/views/register.html'));
});

module.exports = router;
