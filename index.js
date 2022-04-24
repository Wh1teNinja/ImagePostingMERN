const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const upload = multer();

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4200;

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});