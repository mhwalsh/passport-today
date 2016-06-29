var express = require('express');
var router = express.Router();

var path = require('path');
var pg = require('pg');

//require modules
var encryptionLib = require('../modules/encryption');
var connection = require('../modules/connection');

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
  pg.connect(connection, function (err, client, done) {

    var userToSave = {
      username: req.body.username,
      password: encryptionLib.encryptPassword(req.body.password)
    };

    client.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
     [userToSave.username, userToSave.password],
      function(err, result) {
        done();

        if(err){
          console.log(err);
          res.sendStatus(500);
        }else{
          // console.log(result);
          console.log('success', result.rows[0].id);
          res.redirect('/');
        }
    });
  });
});

module.exports = router;
