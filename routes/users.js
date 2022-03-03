const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");
// SIGNUP
router.post("/user/signup", async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.fields;
    const emailExist = await User.findOne({ email: email });
    if (!emailExist) {
      if (password === confirmPassword) {
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(64);

        if (
          email &&
          username &&
          password &&
          confirmPassword &&
          req.files.avatar.path
        ) {
          const newUser = new User({
            email,
            username,
            salt,
            hash,
            token,
          });

          const avatar = await cloudinary.uploader.upload(
            req.files.avatar.path,
            {
              folder: `gamepad/users/${username}`,
            }
          );

          newUser.avatar = avatar;

          await newUser.save();
          res.status(200).json({
            id: newUser._id,
            username,
            token,
            avatar,
          });
        } else {
          res
            .status(400)
            .json({ error: { message: "All fields are required." } });
        }
      } else {
        res.status(401).json({
          error: { message: "Les mots de passe doivent être identiques" },
        });
      }
    } else {
      res.status(409).json({
        error: { message: "This email is already used." },
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// LOGIN
router.post("/user/login", async (req, res) => {
  const { email, password } = req.fields;
  try {
    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user) {
        const newHash = SHA256(password + user.salt).toString(encBase64);
        if (user.hash === newHash) {
          res.status(200).json({
            id: user._id,
            username: user.username,
            token: user.token,
          });
        } else {
          res.status(402).json({ error: "Wrong email or password" });
        }
      } else {
        res.status(401).json({ error: "Wrong email or password" });
      }
    } else {
      res.status(400).json({ message: "You have to fill all fields" });
    }
  } catch (error) {
    console.log({ message: error.message });
  }
});

module.exports = router;
