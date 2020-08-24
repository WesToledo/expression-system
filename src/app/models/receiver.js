const mongoose = require("../../database");

const ReceiverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      address: {
        via: {
          type: String,
          required: true,
        },
        number: {
          type: Number,
          required: true,
        },
        neighborhood: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        city: { type: String, required: true },
      },
      cel_phone: {
        type: String,
        required: true,
      },
});

const Receiver = mongoose.model("Receiver", ReceiverSchema);

module.exports = Receiver;
