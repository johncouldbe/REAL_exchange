const { BasicStrategy } = require('passport-http');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const jsonParser = require('body-parser').json();
const { User } = require('./models');
const mongoose = require('mongoose');

const mockUsers = require('../MOCK_DATA.json');
const mockPosts = require('../MOCK_DATA_POSTS.json');

router.use(jsonParser);
const base = process.env.PWD;

//Reusable Id for the main user
let id;

router.get('/', (req, res) => {
  res.sendFile(base + '/views/login.html');
});

router.get('/home', (req, res) => {
  res.sendFile(base + '/views/index.html');
});

//Send all users
router.get('/users', function(req, res) {
  res.json(mockUsers);
});

//Send specific user
router.get('/users/:id', function(req, res) {
  id = req.params.id;
  let user = mockUsers.filter(function(usr) {
    return usr.id == id;
  });
  res.json(user);
});


//Send all posts
router.get('/posts', (req, res) => {
  res.json(mockPosts);
});

//Send a requested post
router.get('/posts/:id', (req, res) => {
  id = req.params.id;
  let posts = mockPosts.filter(function(post) {
    return post.id == id;
  });
  res.json(posts);
});

//Send posts specific to user
router.get('/posts/user/:id', (req, res) => {
  id = req.params.id;
  let posts = mockPosts.filter(function(post) {
    return post.user_id == id;
  });
  res.json(posts);
});

// app.put('/users/:id', (req, res) => {
//   // ensure that the id in the request path and the one in request body match
//   if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
//     const message = (
//       `Request path id (${req.params.id}) and request body id ` +
//       `(${req.body.id}) must match`);
//     console.error(message);
//     res.status(400).json({message: message});
//   }
// });

module.exports = { router };
