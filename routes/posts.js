const express = require('express');
const router = express.Router();
const { Post } = require('../models/post');


//Send all posts
router.get('/', isAuthenticated, (req, res) => {
  Post
  .find()
  .then(posts => {
    res.json({ posts });
  });
});

//Send a requested post
router.get('/:id', isAuthenticated, (req, res) => {
  id = req.params.id;
  Post
  .findOne({ _id: id })
  .then(post => {
    res.json({ post });
  })
  .catch(err => res.send(err));
});

//Send posts specific to user
router.get('/user/posts', isAuthenticated, (req, res) => {
  console.log(req.user);
  const id = req.user._id;
  Post
  .find({userId: id})
  .then(posts => {
    res.json({posts});
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
