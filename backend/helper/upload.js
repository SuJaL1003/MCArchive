const path = require("path");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadFile = async (filePath) => {
  try {
    const fileName = path.basename(filePath);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      use_filename: true,
      unique_filename: false,
      public_id: fileName.endsWith(".pdf")
        ? fileName.replace(".pdf", "")
        : fileName,
      format: "pdf",
    });

    console.log("✅ File Uploaded to Cloudinary:");
    console.log("Public ID:", result.public_id);
    console.log("Secure URL:", result.secure_url);

    return result.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    throw error;
  }
};

module.exports = { uploadFile };
