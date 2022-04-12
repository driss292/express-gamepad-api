require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const morgan = require("morgan");

mongoose.connect(process.env.MONGODB_URI);

cloudinary.config({
  cloud_name: "dbu3ntrbw",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  // secure: true,
});

const app = express();
app.use(formidable());
app.use(cors());
app.use(morgan("dev"));

const userRoutes = require("./routes/users");
app.use(userRoutes);
const favoriteRoutes = require("./routes/favorites");
app.use(favoriteRoutes);
const reviewRoutes = require("./routes/reviews");
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
