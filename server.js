require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs  = require('express-handlebars');
const { SECRET_KEY, PORT, DATABASE_URL } = require('./config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const flash = require('connect-flash');
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session);

var formidable = require('formidable');
var fs = require('fs');

// Route Initializers
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

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
  secret: SECRET_KEY,
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

// Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

app.get('*', function(req, res) {
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
