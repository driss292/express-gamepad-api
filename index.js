require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const morgan = require("morgan");

mongoose.connect("mongodb://localhost/gamepad-back");

cloudinary.config({
  cloud_name: "dbu3ntrbw",
  api_key: "941355411535247",
  api_secret: "HcqTa9Hdd3VqKJByfC7v4ngPFlY",
  secure: true,
});

const app = express();
app.use(formidable());
app.use(cors());
app.use(morgan("dev"));

const userRoutes = require("./routes/users");
app.use(userRoutes);
const favoriteRoutes = require("./routes/favorite");
app.use(favoriteRoutes);
const reviewRoutes = require("./routes/review");
app.use(reviewRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "NO ROUTE" });
});
app.listen(process.env.PORT || 4000, () => {
  console.log("Sever OK !!!");
});
