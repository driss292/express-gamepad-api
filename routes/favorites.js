const express = require("express");
const router = express.Router();

const Favorite = require("../models/Favorite");
const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User");
const mongoose = require("mongoose");

router.get("/favorites", isAuthenticated, async (req, res) => {
  const user = req.user;
  const responseUser = await user;
  res.status(200).json({ favorite: responseUser.favoriteGames });
});

router.post("/favorite/create", isAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    const favorite = new Favorite({
      user: user._id,
      gameData: req.fields.game,
    });
    await favorite.save();
    user.favorite.push(favorite);
    await user.save();
    res.status(200);
    json({ message: "Favorite has been saved !" });
  } catch (error) {
    res.status(400).json({ error: { message: error.mesqage } });
  }
});

module.exports = router;
