const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.autorization.replace("Bearer ", "");
      const user = await User.findOne({ token: token }).select(
        "favoriteGames email username token reviews _id"
      );
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: "Unauthorized, didn't find user" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = isAuthenticated;
