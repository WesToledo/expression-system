const mongoose = require("../../database");

const ClientSchema = new mongoose.Schema({
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
  fix_phone: {
    type: String,
  },
  cel_phone: {
    type: String,
    require: true,
  },
  reference_name: {
    type: String,
  },
});

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
