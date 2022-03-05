const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  text: String,
  // grade: Number,
  thumbUp: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  thumbDown: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  gameData: Object,
});

module.exports = Review;
