const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  licenseNumber: {
    type: Number,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ""},
  lastName: {type: String, default: ""},
  company: {type: String, default: ""},
  profilePic: {type: String, default: "https://lorempixel.com/400/400/"},
  bio: {type: String, default: "Hello, everyone! I'm new to REAL Exchange. Please send me a message!"},
  phoneNumber: {type: String, default: ""},
  email: {type: String, default: ""},
  website: {type: String, default: ""},
  associations: {type: Array, default: []},
  contacts: {type: Array, default: []},
});

UserSchema.methods.apiRepr = function() {
  return {
    _id: this._id,
    licenseNumber: this.licenseNumber || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    company: this.company || '',
    profilePic: this.profilePic || '',
    bio: this.bio || '',
    phoneNumber: this.phoneNumber || '',
    email: this.email || '',
    website: this.website || '',
    associations: this.associations || '',
    contacts: this.contacts || ''
  };
}

UserSchema.methods.contactInfo = function() {
  return {
    _id: this._id,
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    profilePic: this.profilePic || '',
    company: this.company || ''
  };
}

UserSchema.methods.validatePassword = function(password) {
  console.log('validating password');
  return bcrypt.compareSync(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('User', UserSchema);

// function getUserByLicenseNum (username, callback) {
//   const query = { username: username };
//   User.findOne(query, callback)
// }


module.exports = { User };
