const mongoose = require("../../database");

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    via: {
      type: String,
      default: "",
    },
    number: {
      type: String,
      default: "",
    },
    neighborhood: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    city: { type: String, default: "" },
  },
  fix_phone: {
    type: String,
    default: "",
  },
  cel_phone: {
    type: String,
    default: "",
  },
  reference_name: {
    type: String,
    default: "",
  },
});

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
