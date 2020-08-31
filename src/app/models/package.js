const mongoose = require("../../database");

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const Package = mongoose.model("Package", PackageSchema);

module.exports = Package;
