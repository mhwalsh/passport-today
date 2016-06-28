var express = require('express');
// var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();

var passport = require('../strategies/user-local.js');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

// require routers
var index = require('../routes/index');
var register = require('../routes/register');

//use routes
app.use('/register', register);
app.use('/*', index); //login

// server listen
app.listen(3000, function(){
  console.log('listening on port 3000');
});
