const mongoose = require("../../database");

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  login: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
    default: "DeliverMan",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
