const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Twit = mongoose.model('Twit', new mongoose.Schema({
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

function validateTwit(twit) {
  const schema = Joi.object({
    caption: Joi.string().min(2).required(),
    text: Joi.string().min(5).required(), 
    date: Joi.date().required()
  });

  return schema.validate(twit);
}

exports.Twit = Twit; 
exports.validate = validateTwit;