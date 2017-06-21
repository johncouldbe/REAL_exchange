const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  id: { type: String, default: uuidv1 },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ""},
  lastName: {type: String, default: ""},
  profilePic: {type: String, default: "https://lorempixel.com/400/400/"},
  bio: {type: String, default: "Hello, everyone! I'm new to REAL Exchange. Please send me a message!"},
  phoneNumber: {type: String, default: ""},
  email: {type: String, default: ""},
  website: {type: String, default: ""},
  associations: {type: Array, default: []},
  friends: {type: Array, default: []},
});

UserSchema.methods.apiRepr = function() {
  return {
    licenseNumber: this.licenseNumber || '',
    firstName: this.firstName || '',
    lastName: this.lastName || ''
  };
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};
