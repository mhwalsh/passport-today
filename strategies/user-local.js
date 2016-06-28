var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var pg = require('pg');

//require module
var connection = require('../modules/connection');

// serialize and deserialize

passport.use('local', new LocalStrategy(
  {
    passReqToCallback: true,
    usernameField: 'username'
  }, function(req, username, password, passDone) { // passport done
      console.log('hit local strategy');

      pg.connect(connection, function(err, client, pgDone) {
        if(err){
          console.log(err);
        }

        client.query('SELECT * FROM users WHERE username = $1',
          [username], function(err, result) {
            pgDone();

            if(err){
              console.log(err);
              return passDone(null, false);

            }else{
              console.log('result.rows =', result.rows);

              //found a something
              if(result.rows.length >= 1){

                var passwordDB = result.rows[0].password;
                if(password === passwordDB){
                  console.log('correct pass');
                  return passDone(null, result.rows[0]);
                }
              }
              console.log('nope');
              return passDone(null, false);
            }
        });
      });
  }
));

module.exports = passport;
