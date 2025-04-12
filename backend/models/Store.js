var mongoose = require("mongoose");

var storeSchema = new mongoose.Schema({
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
    required: true,
  },
  file_url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Store", storeSchema);
