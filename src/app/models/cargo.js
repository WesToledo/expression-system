const mongoose = require("../../database");

const CargoSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  packages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  month: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cargo = mongoose.model("Cargo", CargoSchema);

module.exports = Cargo;
