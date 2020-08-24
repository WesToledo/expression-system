const mongoose = require("../../database");

const CargoSchema = new mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  packages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  open: {
    type: Boolean,
    require: true,
    default: false,
  },
  total: {
    type: Number,
    require: true,
    default: 0,
  },
});

const Cargo = mongoose.model("Cargo", CargoSchema);

module.exports = Cargo;
