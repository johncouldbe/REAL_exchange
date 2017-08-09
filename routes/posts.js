const express = require('express');
const cloudinary = require('cloudinary');
var formidable = require('formidable');
var fs = require('fs');
const router = express.Router();
const path = require('path');
const { Post } = require('../models/post');
const uuidv4 = require('uuid/v4');


//Send all posts
router.get('/', isAuthenticated, (req, res) => {
  Post
  .find()
  .sort('-date')
  .then(posts => {
    res.json({ posts });
  });
});

//Send posts specific to user
router.get('/user', isAuthenticated, (req, res) => {
  const id = req.user._id;
  Post
  .find({userId: id})
  .sort('-date')
  .then(posts => {
    res.json({posts, id});
  });
});

//Send posts specific to user
router.get('/user/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;
  Post
  .find({userId: id})
  .sort('-date')
  .then(posts => {
    res.json({posts, id});
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

//Create new post
router.post('/new', isAuthenticated, (req, res) => {
  Post
  .create({
    "userId": req.user._id,
    "firstName": req.user.firstName,
    "lastName": req.user.lastName,
    "body": req.body.data.body,
    "subject": req.body.data.subject,
    "type": req.body.data.type
  })
  .then((post) => res.send(post._id))
  .catch(err => console.log(err));
});

//Update Post
router.put('/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;
  const body = req.body.data.body;
  const subject = req.body.data.subject;
  const type = req.body.data.type;

  Post
  .findByIdAndUpdate(
    { '_id': id },
    {$set: {"body": body, "subject": subject, "type": type}},
    {new: true}
  )
  .then( post => res.json(post))
  .catch(err => console.log(err));
});

//Delete Post
router.delete('/:postId', isAuthenticated, (req, res) => {
  const id = req.params.postId;

  let pubIds;

  Post
    .findOne({ _id: id })
    .then(post => {
      pubIds = post.images.map(img => { return img.publicId });
      if(pubIds.length > 0) {
        removeImages(post);
      }
      else {
        deletePost();
      }

    }).catch(err => console.log(err));

    const removeImages = (post) => {

      const promises = pubIds.map( pubId => {
        return new Promise((resolve, reject) => {
          Post
          .update(
          { _id: id },
          { $pull: { "images" : { "publicId" : pubId } }})
         .then( () => {
            cloudinary.uploader.destroy(pubId, (error, result) => {
              console.log(result);
            });
            resolve();
          })
          .catch( err => console.log(err));
        });
      });

      Promise.all(promises).then(() => { console.log("Deleted Images"); deletePost(); });
    }
     const deletePost = () => {
       Post
      .findByIdAndRemove(id)
      .then(() => { console.log(`Deleted post id: ${id}`); res.send({id}) });
     }
});

//Upload photos to post
router.post('/image/upload/:postId', isAuthenticated, (req, res) => {
  const id = req.params.postId;
  let fileNames = [];
  // create an incoming form object
  let form = new formidable.IncomingForm();
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', (field, file) => {
    const fileName = path.join(form.uploadDir, file.name)
    fileNames.push(fileName);
    fs.rename(file.path, fileName);
  });
  // log any errors that occur
  form.on('error', err => console.log('An error has occured: \n' + err));
  // once all the files have been uploaded, send a response to the client
  form.on('end', () => {
    const promises = fileNames.map(file => {
      return new Promise((resolve, reject) => {
        sendToCloud(file, id, resolve);
      })
    })


    Promise.all(promises).then(result => {
      res.send(result);
    })

  });
  // parse the incoming request containing the form data
  form.parse(req);
});

//Delete images from post
router.put( '/image/delete/:postId', isAuthenticated, (req, res) => {
    const id = req.params.postId;
    let allIds;

    const pubIds = req.body.data.publicIds || allIds;

    console.log('All the IDS: ', allIds);

    const promises = pubIds.map( pubIds => {
      return new Promise((resolve, reject) => {
        Post
        .update(
        { _id: id },
        { $pull: { "images" : { "publicId" : pubIds } }})
       .then( () => {
          cloudinary.uploader.destroy(pubIds, (error, result) => {
            console.log(result);
          });
          resolve();
        })
        .catch( err => console.log(err));
      });
    });

    Promise.all(promises).then(result => res.send(result));
});

//Add comment to post
router.put('/comment/:postId', isAuthenticated, (req, res) => {
  const postId = req.params.postId;
  Post
  .update(
    { _id: postId },
    { $push: { "comments" : {
      "_id": uuidv4(),
      "firstName": req.body.data.firstName,
      "lastName": req.body.data.lastName,
      "userId": req.body.data.userId,
      "body": req.body.data.body,
      "date": req.body.data.date
    } }}
  )
  .then( (post) => {
    console.log(post);
    res.json(post);
  })
  .catch( err => console.log(err));
})

//Delete comment from post
router.put('/comment/delete/:postId', (req,res) => {
  const postId = req.params.postId;

  Post
  .update(
    { _id: postId },
    { $pull: { "comments": { "_id": req.body.data.commentId } }}
  )
  .then( () => {
    res.send('Deleted comment');
  })
  .catch(err => console.log(err));
});



function isAuthenticated (req,res,next) {
   if(req.user){
    return next();
   }
   else {
    return res.redirect('/login');
   }
}

const sendToCloud = (file, id, resolve) => {
  console.log('Image added to post:' + id);
  cloudinary.uploader.upload(file, result => {
    console.log("----" + JSON.stringify(result));
    const img = result.secure_url;
    const imgNm = result.original_filename;
    const pubId = result.public_id;
    resolve(imgNm);

    Post
    .update(
      { '_id': id },
      { $push: {
          images: {
            'image': img,
            'imageName': imgNm,
            'publicId': pubId
          }
        }
      })
    .then( (image) => {

      console.log("Added image to post");
      fs.unlink(file, (err) => {
        if (err) {
            console.log("failed to delete local image:"+err);
        } else {
            console.log('successfully deleted local image');
        }
      });
    })
    .catch(err => console.log(err));
  });
}

module.exports = router;
