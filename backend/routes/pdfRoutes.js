const express = require("express");
const router = express.Router();
const Store = require("../models/Store");

// GET PDFs by semester and subject
router.get("/pdfs", async (req, res) => {
  let { semester, subject } = req.query;

  semester = semester?.trim();
  subject = subject?.trim();

  console.log("API Request - Semester:", semester, "Subject:", subject); // 👈 Add this!

  try {
    const pdfs = await Store.find({
      semester: { $regex: new RegExp(`^${semester}$`, "i") },
      subject: { $regex: new RegExp(`^${subject}$`, "i") },
    });
    console.log("PDFs Found:", pdfs);
    res.json(pdfs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch PDFs" });
  }
});

module.exports = router;
