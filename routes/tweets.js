const moment = require("moment");
const express = require("express");
const router = express.Router();
const httpTwitterService = require("../services/httpTwitterService");

router.get("/", async (req, res) => {

  let tweets = await httpTwitterService.get(
    '/search/tweets.json?q=from:realDonaldTrump&result_type=mixed&tweet_mode=extended&sort_by=created_at-desc'
  );

  shortTweets = tweets.data.statuses.map(element => ({submitted_at: element.created_at, message: element.full_text}));

  const sortedArray = shortTweets.sort((a, b) => {
    return moment(b.submitted_at).diff(a.submitted_at);
  });

  res.send(sortedArray);

});

module.exports = router;