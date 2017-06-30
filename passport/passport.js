const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/user');

passport.serializeUser(function(user, done) {
  console.log('Serializing User');
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('De-Serializing User');
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.signin', new LocalStrategy(
  {
    usernameField: 'licenseNumber',
    passwordField : 'password'
  },
  (licenseNumber, password, done) => {
    User
    .findOne({ 'licenseNumber': licenseNumber }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, { message: 'No user found 😔' });
    }

    if (!user.validatePassword(password)) {
      return done(null, false, { message: 'Wrong password 😔' });
    }

    return done(null, user);
  });
  }
));
