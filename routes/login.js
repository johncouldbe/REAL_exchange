const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', loggedIn, (req, res) => {
    res.render('login', {
      layout: 'layout',
      loginClass: true
    });
});

router.post('/', passport.authenticate('local.signin', {
  session: true,
  failureRedirect: '/login',
  successRedirect:'/'
  }),
  (req, res) => {
    console.log('rerouting to dashboard.');
    res.redirect('/');
});

function loggedIn (req, res, next) {
  if(req.user){
   return res.redirect('/');
  }
  else {
   return next();
  }
}

module.exports = router;
