const express = require('express');
const cloudinary = require('cloudinary');
var formidable = require('formidable');
var fs = require('fs');
const router = express.Router();
const path = require('path');
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
    console.log(post);
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
});

function sendToCloud(file, id) {
  console.log('Image added to post:' + id);
  cloudinary.uploader.upload(file, function(result) {
    console.log(result)
    const image = _result.secure_url;
    Post
    .update(
      { '_id': id },
      { $push: { images: image }
     })
    .then(function() {
      console.log("Added image to post");
    }).catch(err => console.log(err));
  });
}

router.post('/upload/:postId', function(req, res){
  const id = req.params.postId;
  let fileNames = [];
  // create an incoming form object
  var form = new formidable.IncomingForm();
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../uploads');
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fileNames.push(path.join(form.uploadDir, file.name));
    fs.rename(file.path, file.name);
  });
  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    fileNames.forEach(function(file) {
      sendToCloud(file, id);
    })
    res.end('success');
  });
  // parse the incoming request containing the form data
  form.parse(req);
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
