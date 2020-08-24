const mongoose = require("../../database");

const ReceiverSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
      },
      address: {
        via: {
          type: String,
          require: true,
        },
        number: {
          type: Number,
          require: true,
        },
        neighborhood: {
          type: String,
          require: true,
        },
        state: {
          type: String,
          require: true,
        },
        city: { type: String, require: true },
      },
      cel_phone: {
        type: String,
        require: true,
      },
});

const Receiver = mongoose.model("Receiver", ReceiverSchema);

module.exports = Receiver;
