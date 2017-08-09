const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');

// pull in user mode

const should = chai.should();

const { app, runServer, closeServer } = require('../server');
const { User } = require('../models/user');

chai.use(chaiHttp);

describe('Setting up testing the server', function(){

  let user, postId

  before(function(done){
    runServer()

    const userOpts = {
      licenseNumber: 3343,
      password: 'abc123',
      firstName: "Testguy",
      lastName: "Testerino"
    }

    user = new User(userOpts);

    user.save()
      .then(_user => {
        app.request.user = _user
        user = _user
        done()
      })
      .catch(err => console.log(err))

  })

  after(function() {
    // Post
    // .remove({})
    // .then(() => {
    //
    // })

    return User
    .findByIdAndRemove(user._id)
     .exec()
     .then((user, err) =>  {
        if(err) console.log("removing user err", err);
        return closeServer();
     });
  });

  it('Should return static assets on GET at root directory', function() {
    console.log("user", user)
    return chai.request(app)
    .get('/')
    .then(function(res) {
      res.should.have.status(200);
      res.should.have.header('content-type', 'text/html; charset=utf-8');
    })
  });
  //
  it('Should return users on GET /user', function() {
    return chai.request(app)
    .get('/users')
    .then(function(res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.users.should.have.length.of.at.least(1);
    })
  });

  it('Should return a user on GET /users/:id', function() {
    const userId = user._id;
    return chai.request(app)
    .get(`/users/${userId}`)
    .then(function(res) {
      res.should.have.status(200);
      res.body.user._id.should.equal(`${userId}`);
      res.should.be.json;
    });
  });

  // ======= POSTS ========

  it('Should return posts on GET /posts', function() {
    return chai.request(app)
    .get('/posts')
    .then(function(res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.posts.should.have.length.of.at.least(1);
    })
  });

  it('Should create a new post on POST posts/new', function() {
    const newPost = {
      data : {
        "body": "This is a body.",
        "subject": "This is a subject",
        "type": "Wanted"
      }
    }

    return chai.request(app)
    .post('/posts/new')
    .send(newPost)
    .then(function(res) {
      postId = res.body;
      res.should.have.status(200);
      res.should.be.a.string;
    })
  })

  it('Should return the users posts on GET /posts/user/:id', function() {
    const userId = user._id;

    return chai.request(app)
    .get(`/posts/user/${userId}`)
    .then(function(res) {
      res.body.posts[0].userId.should.equal(`${userId}`);
      res.body.posts.should.have.length.of.at.least(1);
      res.should.have.status(200);
    });
  })

  it('Should edit post on PUT posts/:postID', function() {
    const editedPost = {
      data : {
        "body": "This is a still a body.",
        "subject": "This is a still a subject",
        "type": "Available"
      }
    }

    return chai.request(app)
    .put(`/posts/${postId}`)
    .send(editedPost)
    .then(function(res) {
      res.should.have.status(200);
      res.should.be.json;
      console.log(res.body);
      Object.keys(editedPost.data).forEach(key => {
        editedPost.data[key].should.equal(res.body[key])
      })
    })
  })

  it('Should delete a  post on DELETE posts/:postID', function() {
    return chai.request(app)
    .delete(`/posts/${postId}`)
    .then(function(res) {
      console.log(res.body);
      res.should.have.status(200);
      res.should.be.a.string;
      res.body.id.should.equal(postId);
    })
  })

});
