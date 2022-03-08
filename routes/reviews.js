const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

const Review = require("../models/Review");

router.post("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({
      "gameData.slug": req.fields.slug,
    }).populate({
      path: "user",
      select: " email username favoriteGames reviews",
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.post("/review/create", isAuthenticated, async (req, res) => {
  const { title, text, gameData } = req.fields;
  console.log("Ok");
  try {
    const reviewExists = await Review.find({
      "gameData.slug": gameData.slug,
      user: req.user._id,
    });
    if (!reviewExists) {
      const newReview = new Review({
        user: req.user,
        title,
        text,
        gameData,
      });
      await newReview.save();
      res.status(200).json(newReview);
    } else {
      res.status(401).json({
        error: { message: "You have already cerated a review for this game." },
      });
    }
  } catch (error) {
    console.log("NOT OK");
    res.status(400).json({ error: { message: error.message } });
  }
});

module.exports = router;
