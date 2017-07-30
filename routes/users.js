const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

//Send all users
router.get('/', isAuthenticated, function(req, res) {
  User
  .find()
  .exec()
  .then(users => {
    res.json({
      users: users.map(user => user.contactInfo())
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Internal server error'});
  })
});

//Send specific user
router.get('/:id', isAuthenticated, function(req, res) {
  id = req.params.id;
  User
  .findById(id)
  .exec()
  .then(_user => {
    const user = _user.apiRepr()
    res.json({ user });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Internal server error'});
  })
});

router.post('/create/newUser', (req, res) => {
  if (!req.body) {
    return res.status(400).json({message: 'No request body'});
  }

  if (!('licenseNumber' in req.body)) {
    return res.status(422).json({message: 'Missing field: licenseNumber'});
  }

  let {licenseNumber, password, firstName, lastName, profilePic, bio, phoneNumber, email, website, associations ,friends} = req.body;

  if (typeof licenseNumber !== 'number') {
    return res.status(422).json({message: 'Incorrect field type: licenseNumber'});
  }


  if (licenseNumber === '') {
    return res.status(422).json({message: 'Incorrect field length: licenseNumber'});
  }

  if (!(password)) {
    return res.status(422).json({message: 'Missing field: password'});
  }

  if (typeof password !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: password'});
  }

  password = password.trim();

  if (password === '') {
    return res.status(422).json({message: 'Incorrect field length: password'});
  }

  // check for existing user
  return User
    .find({licenseNumber})
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return res.status(422).json({message: 'licenseNumber already taken'});
      }
      // if no existing user, hash password
      return User.hashPassword(password)
    })
    .then(hash => {
      return User
        .create({
          licenseNumber: licenseNumber,
          password: hash,
          firstName: firstName,
          lastName: lastName,
          profilePic: profilePic,
          bio: bio,
          phoneNumber: phoneNumber,
          email: email,
          website: website,
          associations: associations,
          friends: friends
        })
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      res.status(500).json({message: 'Internal server error'})
    });
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

function isAuthenticated (req,res,next) {
   if(req.user){
    return next();
   }
   else {
    return res.redirect('/login');
   }
}

module.exports =  router;
