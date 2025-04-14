const Store = require("../models/Store");
const Upload = require("../helper/upload");

const uploadFile = async (req, res) => {
  try {
    // returns secure_url string
    const fileUrl = await Upload.uploadFile(req.file.path);

    const { semester, subject, unit } = req.body;

    const store = new Store({
      file_url: fileUrl, // ✅ Corrected
      semester,
      subject,
      unit,
    });

    const record = await store.save();

    res.send({
      success: true,
      msg: "File Uploaded Successfully!",
      data: record,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.send({ success: false, msg: error.message });
  }
};

module.exports = {
  uploadFile,
};
