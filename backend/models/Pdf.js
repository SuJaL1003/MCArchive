const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  cloudinaryUrl: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pdf", pdfSchema);
