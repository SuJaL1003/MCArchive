const Store = require("../models/Store");
const Upload = require("../helper/upload");

const uploadFile = async (req, res) => {
  try {
    const upload = await Upload.uploadFile(req.file.path);

    const { semester, subject, unit } = req.body;

    const store = new Store({
      file_url: upload.secure_url,
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
    res.send({ success: false, msg: error.message });
  }
};

module.exports = {
  uploadFile,
};
