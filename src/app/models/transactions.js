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
        require: true,
      },
      amount: {
        type: Number,
        require: true,
        default: 1,
      },
      total: {
        type: Number,
        require: true,
        default: 0,
      },
    },
  ],
  date: {
    type: Date,
    require: true,
  },
  month: {
    type: "String",
    require: true,
  },
  total: {
    type: Number,
    require: true,
    default: 0,
  },
  paid: {
    type: Boolean,
    require: true,
    default: false,
  },
  payday: {
    type: Date,
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
