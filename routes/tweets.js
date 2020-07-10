const { Tweet, validate } = require("../models/tweet");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {
  const tweets = await Tweet.find()
    .select("-__v");
  res.send(tweets);
  console.log(tweets);
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
  const tweet = await Page.findByIdAndUpdate(
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
    return res.status(404).send("The tweets with the given ID was not found.");

  res.send(tweet);
});

router.delete("/:id", async (req, res) => {
  const tweet = await Tweet.findByIdAndRemove(req.params.id);

  if (!tweet)
    return res.status(404).send("The tweets with the given ID was not found.");

  res.send(tweet);
});

router.get("/:tweet", async (req, res) => {

  //console.log('COMING VALUE:', req.params.tweet);
  const tweet = await Page.findById(req.params.id).select("-__v");

  if (!tweet)
    return res.status(404).send("The tweets with the given id was not found.");

  res.send(tweet);
});

module.exports = router;
