const express = require('express');
const app = express();
const { PORT } = require('./config');
const mockUsers = require('./MOCK_DATA.json');
const mockPosts = require('./MOCK_DATA_POSTS.json');

//Reusable Id for the main user
let id;

//Send static Page
app.use('/', express.static('public'));

//Send all users
app.get('/users', function(req, res) {
  res.json(mockUsers);
});

//Send specific user
app.get('/users/:id', function(req, res) {

  id = req.params.id;
  let user = mockUsers.filter(function(usr) {
    return usr.id == id;
  });
  res.json(user);
});


//Send all posts
app.get('/posts/', (req, res) => {
  res.json(mockPosts);
});

//Send posts specific to user
app.get('/posts/:id', (req, res) => {

  let posts = mockPosts.filter(function(post) {
    return post.user_id == id;
  });
  res.json(posts);
});

app.put('/users/:id', (req, res) => {
  // ensure that the id in the request path and the one in request body match
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }

  
}

//Start and Stop server
let server;

function runServer(port = PORT) {
  return new Promise ((resolve, reject) => {
    server = app.listen(port);
    console.log(`Your listening on port ${port}.`);
    resolve();
  });
}

function closeServer() {
  return new Promise ((resolve, reject) => {
    server.close(err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

if(require.main === module) {
  runServer().catch(err => console.log(err));
}

//Export for testing
module.exports = { app, runServer, closeServer };
