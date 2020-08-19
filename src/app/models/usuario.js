const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  endereco: {
    via: {
      type: String,
      require: true,
    },
    numero: {
      type: Number,
      require: true,
    },
    bairro: {
      type: String,
      require: true,
    },
    estado: {
      type: String,
      require: true,
    },
    cidade: { type: String, require: true },
  },
  telefone_fixo: { type: String },
  telefone_celular: { type: String, require: true },
  senha: {
    type: String,
    require: true,
  },
  tipo: {
    type: String,
  },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

module.exports = Usuario;
