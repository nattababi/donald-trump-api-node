const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Tweet = mongoose.model('Tweet', new mongoose.Schema({
  caption: {
    type: String,
    required: true,
    minlength: 2
  },
  text: {
    type: String,
    required: true,
    minlength: 5
  },
  date: {
    type: Date,
    required: true
  }
}));

function validateTweet(tweet) {
  const schema = Joi.object({
    caption: Joi.string().min(2).required(),
    text: Joi.string().min(5).required(), 
    date: Joi.date().required()
  });

  return schema.validate(tweet);
}

exports.Tweet = Tweet; 
exports.validate = validateTweet;