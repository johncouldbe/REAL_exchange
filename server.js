const express = require('express');
const app = express();
const { PORT, DATABASE_URL } = require('./config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {router: loginRouter} = require('./routes');

mongoose.Promise = global.Promise;

// log the http layer
app.use(morgan('common'));

app.use('/', loginRouter);
//Start and Stop server
let server;

// //Send static Page
app.use(express.static('public'));

function runServer(databaseUrl=DATABASE_URL, port=PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if(require.main === module) {
  runServer().catch(err => console.log(err));
}

//Export for testing
module.exports = { app, runServer, closeServer };
