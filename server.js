const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs  = require('express-handlebars');
const { PORT, DATABASE_URL } = require('./config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {router: router} = require('./routes');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const flash = require('connect-flash');
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session);


// Route Initializers
const indexRouter = require('./routes/index.js');

// View Engine
app.engine('.hbs', hbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');

// log the http layer
app.use(morgan('common'));

mongoose.Promise = global.Promise;

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Passport Authentication
require('./passport/passport');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Express Validator
app.use(validator());

// Cookie Parser
app.use(cookieParser());

// Sessions
app.use(session({
  secret: 'johnssecret',
  resave: false,
  saveUninitialized: false,
  // Session Store
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  // Session Expiration period → 3 hours
  cookie: { maxAge: 180 * 60 * 1000 },
}));

// Use flash messages
app.use(flash());

/* Passport */
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});


app.use('/', router);

router.use('*', function(req, res) {
  return res.status(404).json({message: 'Not Found'});
});

//Start and Stop server
let server;

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
