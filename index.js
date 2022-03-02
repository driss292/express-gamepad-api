require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

mongoose.connect("mongodb://localhost/gamepad-back");

const app = express();
app.use(formidable());
app.use(cors());
app.use(morgan("dev "));

const userRoutes = require("./routes/users");
app.use(userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "NO ROUTE" });
});
app.listen(3000, () => {
  console.log("Sever OK !!!");
});
