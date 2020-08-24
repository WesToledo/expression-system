const mongoose = require("../../database");

const TransactionSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receiver",
  },
  volumes: [
    {
      name: {
        type: String,
        default: "",
      },
      value: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        default: 1,
      },
      total: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  month: {
    type: "String",
    required: true,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  paid: {
    type: Boolean,
    required: true,
    default: false,
  },
  payday: {
    type: Date,
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
