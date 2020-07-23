//import axios from "axios";
const moment = require("moment");
const express = require("express");
const router = express.Router();
const httpTwitterService = require("../services/httpTwitterService");

router.get("/", async (req, res) => {

  let tweets = await httpTwitterService.get(
    '/search/tweets.json?q=from:realDonaldTrump&result_type=mixed&tweet_mode=extended&sort_by=created_at-desc'
  );
  
  shortTweets = tweets.data.statuses.map(element => ({created_at: element.created_at, full_text: element.full_text}));

  //console.log(shortTweets);

  res.send(shortTweets);

});

module.exports = router;
