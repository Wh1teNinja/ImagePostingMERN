const express = require("express");
const mongoose = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const crypto = require("crypto");

require("dotenv").config();

const PORT = process.env.PORT || 4200;
const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.ngvk4.mongodb.net/myWebsite?retryWrites=true&w=majority`;

const app = express();

app.use(cors());

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Connection to the database failed: ", err);
  });

let gfs;

connection = mongoose.connection;

connection.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "images",
  });
});

const storage = new GridFsStorage({
  url: dbUrl,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "images",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.post("/api/image-upload", upload.single("file"), (req, res) => {
  console.log("trying to upload image");
  console.log(req.file);
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
