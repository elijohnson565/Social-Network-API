const { Schema, model } = require('mongoose');
const response = require('./Response');
const dateFormat = require('../utils/dateFormat');

//Post schema
const post = new Schema(
  {
    postContent: {
      type: String,
      required: 'You need to add a post',
      minlength: 1,
      maxlength: 200
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    responses: [response]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

//return the amount of responses on a post
post.virtual('responseAmount').get(function() {
  return this.responses.length;
});

const Post = model('Post', post);

module.exports = Post;