const mongoose = require("../../database");

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Package = mongoose.model("Package", PackageSchema);

module.exports = Package;
