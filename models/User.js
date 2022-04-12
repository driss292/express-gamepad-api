const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  username: {
    require: true,
    type: String,
  },
  token: String,
  hash: String,
  salt: String,
  favoriteGames: [{ ref: "Favorite", type: mongoose.Schema.Types.ObjectId }],
  reviews: [{ ref: "Review", type: mongoose.Schema.Types.ObjectId }],
  avatar: Object,
});

module.exports = User;
