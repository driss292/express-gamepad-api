const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: String,
  text: String,
  thumbUp: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  thumbDown: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  gameData: Object,
});

module.exports = Review;
