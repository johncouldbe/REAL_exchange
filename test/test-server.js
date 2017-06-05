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

});
