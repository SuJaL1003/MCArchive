const express = require("express");
const multer = require("multer");
const { cloudinary } = require("../utils/cloudinaryConfig");
const Pdf = require("../models/Pdf");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tempDir = path.join(__dirname, "../temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer upload config
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf")
      return cb(new Error("Only PDFs allowed"));
    cb(null, true);
  },
});

// Upload route (admin)
router.post("/admin/upload-file", upload.single("pdf"), async (req, res) => {
  try {
    const { file } = req;
    const { semester, subject, unit } = req.body;

    if (!file || !semester || !subject || !unit) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const folderPath = `pdfs/${semester}/${subject}/${unit}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
      access_mode: "public",
      folder: folderPath,
      public_id: path.parse(file.originalname).name,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });

    // Remove local file
    fs.unlinkSync(file.path);

    // Use the default secure_url for viewing
    const viewUrl = result.secure_url;

    // Save in MongoDB
    const newPdf = new Pdf({
      fileName: file.originalname,
      cloudinaryId: result.public_id,
      cloudinaryUrl: viewUrl,
      semester,
      subject,
      unit,
    });

    await newPdf.save();

    res.status(200).json({
      msg: "PDF uploaded successfully!",
      viewUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// **New route for PYQ upload — no unit field required**
router.post("/admin/upload-pyq", upload.single("pdf"), async (req, res) => {
  try {
    const { file } = req;
    const { semester, subject } = req.body;

    if (!file || !semester || !subject) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const folderPath = `pyqs/${semester}/${subject}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
      access_mode: "public",
      folder: folderPath,
      public_id: path.parse(file.originalname).name,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });

    // Remove local file
    fs.unlinkSync(file.path);

    // Use the default secure_url for viewing
    const viewUrl = result.secure_url;

    // Save in MongoDB with unit as null or omit it
    const newPyq = new Pdf({
      fileName: file.originalname,
      cloudinaryId: result.public_id,
      cloudinaryUrl: viewUrl,
      semester,
      subject,
      unit: null,
    });

    await newPyq.save();

    res.status(200).json({
      msg: "PYQ uploaded successfully!",
      viewUrl,
    });
  } catch (error) {
    console.error("PYQ upload error:", error);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: "Failed to upload PYQ" });
  }
});

// Fetch PDFs by subject
router.get("/get-pdfs-by-subject", async (req, res) => {
  try {
    let { semester, subject } = req.query;
    if (!semester || !subject) {
      return res.status(400).json({ error: "Semester and subject required" });
    }

    semester = decodeURIComponent(semester).trim();
    subject = decodeURIComponent(subject).trim();

    const pdfs = await Pdf.find({
      semester: { $regex: new RegExp(`^${semester}$`, "i") },
      subject: { $regex: new RegExp(`^${subject}$`, "i") },
    });

    res.status(200).json({ pdfs });
  } catch (err) {
    console.error("Error in get-pdfs-by-subject:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
