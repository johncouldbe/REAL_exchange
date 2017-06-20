const express = require('express');
const app = express();
const { PORT } = require('./config');
const morgan = require('morgan');
const {router: usersRouter} = require('./users');

// log the http layer
app.use(morgan('common'));

app.use('/', usersRouter);
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
