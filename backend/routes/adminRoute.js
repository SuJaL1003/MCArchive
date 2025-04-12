const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const adminController = require("../controller/adminController");

// Multer config
const uploader = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.pdf$/)) {
      return cb(new Error("Only PDF files are allowed!"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 100 * 1024 * 1024 }, // 5 MB limit
});

// Route
router.post(
  "/upload-file",
  uploader.single("file"),
  adminController.uploadFile
);

module.exports = router;
