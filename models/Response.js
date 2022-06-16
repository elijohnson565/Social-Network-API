const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//response schema
const response = new Schema(
  {
    responseId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    responseBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = response;
