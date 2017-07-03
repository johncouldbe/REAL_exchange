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

//Send posts specific to user
router.get('/user', isAuthenticated, (req, res) => {
  console.log(req.user);
  const id = req.user._id;
  Post
  .find({userId: id})
  .then(posts => {
    res.json({posts});
  });
});

//Send a requested post
router.get('/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;
  Post
  .findOne({ _id: id })
  .then(post => {
    res.json({ post });
  })
  .catch(err => res.send(err));
});

router.put('/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;
  const body = req.body.data.body;
  const subject = req.body.data.subject;
  const type = req.body.data.type;

  Post
  .updateOne(
    { '_id': id },
    {$set: {"body": body, "subject": subject, "type": type}}
  )
  .catch(err => console.log(err));
});

router.delete('/:id', isAuthenticated, (req, res) => {
  Post
  .delete(req.params.id);
  console.log(`Delete post id:${req.params.id}`);
})

function isAuthenticated (req,res,next) {
   if(req.user){
    return next();
   }
   else {
    return res.redirect('/login');
   }
}

module.exports = router;
