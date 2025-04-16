// backend/config/multer.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./upload");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mca-notes", // Optional folder name in Cloudinary
    resource_type: "auto", // Important for PDF and non-image files
    format: async (req, file) => "pdf",
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
