const mongoose = require("../../database");

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
});

const Package = mongoose.model("Package", PackageSchema);

module.exports = Package;
