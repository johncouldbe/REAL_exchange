const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  userId: {type: String},
  firstName: {type: String, default: ""},
  lastName: {type: String, default: ""},
  body: {type: String, default: ""},
  subject: {type: String, default: ""},
  date: { type: Date, default: Date.now },
  type: {type: String, default: ""},
  images: {type: Array, default: []},
  comments: {type: Array, default: []}
});

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };
