const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Favorite = require("../models/Favorite");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { Mongoose } = require("mongoose");

router.get("/favorites", isAuthenticated, (req, res) => {
  const user = req.user;
  const responseUser = await user.populate("favoriteGames");
  res.status(200).json({ favorite: responseUser.favoriteGames });
});

module.exports = router;
