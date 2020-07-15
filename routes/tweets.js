//import axios from "axios";
const axios = require("axios")
const { Tweet, validate } = require("../models/tweet");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {

  let token = "AAAAAAAAAAAAAAAAAAAAAJHxFwEAAAAAH6BsRCd1EKF6B8EG90V%2F1c70czg%3DoIftgz7sE1x89fd83KuP260cRiF5Cg6jZl78xUaRVYujOVnSFu";

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const bodyParameters = {
  };

  let tweets = await axios.get(
    'https://api.twitter.com/1.1/search/tweets.json?q=from:realDonaldTrump&result_type=mixed&tweet_mode=extended&sort_by=created_at-desc',
    config
  );

  console.log(tweets.data.statuses);
  
  res.send(tweets.data.statuses);

});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let tweet = new Tweet({
    caption: req.body.caption,
    text: req.body.text,
    date: req.body.date
  });
  tweet = await tweet.save();

  res.send(tweet);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  console.log('');
  const tweet = await Tweet.findByIdAndUpdate(
    req.params.id,
    {
      caption: req.body.caption,
      text: req.body.text,
      date: req.body.date
    },
    {
      new: true
    }
  );

  if (!tweet)
    return res.status(404).send("The tweet with the given ID was not found.");

  res.send(tweet);
});

router.delete("/:id", async (req, res) => {
  const tweet = await Tweet.findByIdAndRemove(req.params.id);

  if (!tweet)
    return res.status(404).send("The tweets with the given ID was not found.");

  res.send(tweet);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const tweet = await Tweet.findById(req.params.id).select("-__v");

  if (!tweet)
    return res.status(404).send("The tweet with the given id was not found.");

  res.send(tweet);
});

module.exports = router;
