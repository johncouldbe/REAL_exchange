const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const mongoose = require('mongoose');

//logout
router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send(200);
});

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

router.get('/current', isAuthenticated, (req, res) => {
  const id = req.user._id;
  User
  .findById(id)
  .exec()
  .then(user => {
    res.json({user});
  });
})

router.get('/current/contacts', isAuthenticated, (req, res) => {

  const contacts = req.user.contacts.map(contact => {
    return mongoose.Types.ObjectId(`${contact.userId}`)
  });

  User
  .find({
    '_id': { $in: contacts}
  })
  .then(users => {
    res.json({users});
  });
});

router.put('/current/update', isAuthenticated, (req, res) => {
  const id = req.user._id;
  const update = req.body.data.credentials
  User
  .updateOne(
    { '_id': id },
    {$set: {"bio": update.bio, "phoneNumber": update.phoneNumber, "email": update.email, "website": update.website }}
  )
  .then(user => {
    res.json({user});
  });
})

router.put('/add/:id', (req, res) => {
  const userId = req.params.id;
  const id = req.user._id;
  User
  .findByIdAndUpdate(id,
    { $push: { "contacts" : { "userId" : userId }}},
    {new: true}
  )
  .then(user =>  res.json(user) )
  .catch(err => console.log(err))
});

router.put('/remove/:id', (req, res) => {
  const userId = req.params.id;
  const id = req.user._id;
  User
  .findByIdAndUpdate(id,
    { $pull: { "contacts" : { "userId" : userId }}},
    {new: true}
  )
  .then(user =>  res.json(user) )
  .catch(err => console.log(err))
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

// router.post('/create/newUser', (req, res) => {
//   if (!req.body) {
//     return res.status(400).json({message: 'No request body'});
//   }
//
//   if (!('licenseNumber' in req.body)) {
//     return res.status(422).json({message: 'Missing field: licenseNumber'});
//   }
//
//   let {licenseNumber, password, firstName, lastName, profilePic, bio, phoneNumber, email, website, associations ,friends} = req.body;
//
//   if (typeof licenseNumber !== 'number') {
//     return res.status(422).json({message: 'Incorrect field type: licenseNumber'});
//   }
//
//
//   if (licenseNumber === '') {
//     return res.status(422).json({message: 'Incorrect field length: licenseNumber'});
//   }
//
//   if (!(password)) {
//     return res.status(422).json({message: 'Missing field: password'});
//   }
//
//   if (typeof password !== 'string') {
//     return res.status(422).json({message: 'Incorrect field type: password'});
//   }
//
//   password = password.trim();
//
//   if (password === '') {
//     return res.status(422).json({message: 'Incorrect field length: password'});
//   }
//
//   // check for existing user
//   return User
//     .find({licenseNumber})
//     .count()
//     .exec()
//     .then(count => {
//       if (count > 0) {
//         return res.status(422).json({message: 'licenseNumber already taken'});
//       }
//       // if no existing user, hash password
//       return User.hashPassword(password)
//     })
//     .then(hash => {
//       return User
//         .create({
//           licenseNumber: licenseNumber,
//           password: hash,
//           firstName: firstName,
//           lastName: lastName,
//           profilePic: profilePic,
//           bio: bio,
//           phoneNumber: phoneNumber,
//           email: email,
//           website: website,
//           associations: associations,
//           friends: friends
//         })
//     })
//     .then(user => {
//       return res.status(201).json(user.apiRepr());
//     })
//     .catch(err => {
//       res.status(500).json({message: 'Internal server error'})
//     });
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
