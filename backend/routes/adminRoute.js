const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

const adminController = require("../controller/adminController");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

const multer = require("multer");

var uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
});

router.post(
  "/upload-file",
  uploader.single("file"),
  adminController.uploadFile
);

module.exports = router;
