const express = require('express');
const app = express();
const { PORT } = require('./config');

app.use('/', express.static('public'));

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

module.exports = { app, runServer, closeServer };
