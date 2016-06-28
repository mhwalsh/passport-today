var express = require('express');
// var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();

var passport = require('../strategies/user-local.js');
var session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.use(session({
  secret: 'secret',
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: {maxage: 60000, secure: false}
}));

//init passport
app.use(passport.initialize());
app.use(passport.session());

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
