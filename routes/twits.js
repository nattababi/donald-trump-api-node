const { Twit, validate } = require("../models/twit");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {
  const twits = await Twit.find()
    .select("-__v");
  res.send(twits);
  console.log(twits);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let twit = new Twit({
    caption: req.body.caption,
    text: req.body.text,
    date: req.body.date
  });
  twit = await twit.save();

  res.send(twit);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  console.log('');
  const twit = await Page.findByIdAndUpdate(
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

  if (!twit)
    return res.status(404).send("The twit with the given ID was not found.");

  res.send(twit);
});

router.delete("/:id", async (req, res) => {
  const twit = await Twit.findByIdAndRemove(req.params.id);

  if (!twit)
    return res.status(404).send("The twits with the given ID was not found.");

  res.send(twit);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const twit = await Twit.findById(req.params.id).select("-__v");
  
  if (!twit)
    return res.status(404).send("The twit with the given id was not found.");

  res.send(twit);
});

module.exports = router;
