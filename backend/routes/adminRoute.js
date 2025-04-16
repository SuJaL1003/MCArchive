// const express = require("express");
// const router = express.Router();
// const path = require("path");
// const multer = require("multer");

// const adminController = require("../controller/adminController");

// // Multer config
// const uploader = multer({
//   storage: multer.diskStorage({
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     if (!file.originalname.match(/\.pdf$/)) {
//       return cb(new Error("Only PDF files are allowed!"), false);
//     }
//     cb(null, true);
//   },
//   limits: { fileSize: 100 * 1024 * 1024 }, // 5 MB limit
// });

// // Route
// router.post(
//   "/upload-file",
//   uploader.single("file"),
//   adminController.uploadFile
// );

// module.exports = router;

// backend/routes/uploadRoute.js
require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ Multer Memory Storage (no local folder)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ✅ Upload Route
router.post("/upload-file", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload stream function
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image", // for PDFs and non-images
            folder: "mca-notes",
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    // Upload file buffer to Cloudinary
    const result = await streamUpload(req.file.buffer);

    res.status(200).json({
      message: "File uploaded successfully",
      url: result.secure_url + ".pdf", // 👈 force inline PDF opening
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ error: "Cloudinary upload failed" });
  }
});

module.exports = router;
