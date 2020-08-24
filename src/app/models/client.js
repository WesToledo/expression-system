const mongoose = require("../../database");

const ClientSchema = new mongoose.Schema({
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
  fix_phone: {
    type: String,
  },
  cel_phone: {
    type: String,
    required: true,
  },
  reference_name: {
    type: String,
  },
});

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
