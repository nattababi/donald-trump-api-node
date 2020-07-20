const express = require('express');
const tweets = require('../routes/tweets');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/tweets', tweets);
  app.use(error);
}