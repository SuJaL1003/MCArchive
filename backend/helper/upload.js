// const path = require("path");
// const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// const uploadFile = async (filePath) => {
//   try {
//     const fileName = path.basename(filePath);

//     const result = await cloudinary.uploader.upload(filePath, {
//       resource_type: "raw", // 👈 Important for PDF
//       use_filename: true,
//       unique_filename: false,
//       public_id: fileName.replace(/\.pdf$/, ""), // 👈 remove extra .pdf
//       format: "pdf",
//     });

//     console.log("✅ Uploaded:", result.secure_url);
//     return result.secure_url;
//   } catch (error) {
//     console.error("❌ Upload error:", error);
//     throw error;
//   }
// };

// module.exports = { uploadFile };

// backend/config/cloudinary.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

module.exports = cloudinary;
