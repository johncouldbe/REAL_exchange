const express = require('express');
const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
    const user = req.user;
    res.render('index', {
      layout: 'layout',
      user: user,
      associations: user.associations
    });
});

function isAuthenticated (req,res,next) {
   if(req.user){
    return next();
   }
   else {
    return res.redirect('/login');
   }
}

module.exports = router;
