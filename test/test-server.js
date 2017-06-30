const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

const { app, runServer, closeServer } = require('../server');

chai.use(chaiHttp);
describe('Server', function(){

  before(function() {
    runServer();
  });

  after(function() {
    closeServer();
  });

  it('Should return static assets on GET at root directory', function() {
    return chai.request(app)
    .get('/')
    .then(function(res) {
      res.should.have.status(200);
      res.should.have.header('content-type', 'text/html; charset=UTF-8');
    })
  });

  // it('Should return users on GET /user', function() {
  //   return chai.request(app)
  //   .get('/users')
  //   .then(function(res) {
  //     res.should.have.status(200);
  //     res.should.be.json;
  //     res.body.should.have.length.of.at.least(1);
  //   })
  // });
  //
  // it('Should return the user on GET /users/:id', function() {
  //   let userId;
  //
  //   return chai.request(app)
  //   .get('/users')
  //   .then(function(res) {
  //     userId = res.body[0].id;
  //   });
  //
  //   return chai.request(app)
  //   .get('/users/:id')
  //   .then(function(res) {
  //     res.should.have.status(200);
  //     res.body.id.should.equal(userId);
  //     res.should.be.json;
  //   });
  // });
  //
  // it('Should return posts on GET /posts', function() {
  //   return chai.request(app)
  //   .get('/users')
  //   .then(function(res) {
  //     res.should.have.status(200);
  //     res.should.be.json;
  //     res.body.should.have.length.of.at.least(1);
  //   })
  // });
  //
  // it('Should return the users posts on GET /posts/:id', function() {
  //   let userId;
  //
  //   return chai.request(app)
  //   .get('/posts')
  //   .then(function(res) {
  //     userId = res.body[0].user_id;
  //   });
  //
  //   return chai.request(app)
  //   .get('/posts/:id')
  //   .then(function(res) {
  //     res.should.have.status(200);
  //     res.body.user_id.should.equal(userId);
  //     res.should.be.json;
  //     res.body.should.have.length.of.at.least(1);
  //   });
  // });

});
