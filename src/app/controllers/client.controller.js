const ClientSchema = require("../models/client");

async function create(req, res) {
  try {
    const client = await ClientSchema.create(req.body);

    return res.send({ client });
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: "Erro ao cadastrar cliente" });
  }
}

async function index(req, res) {
  try {
    const client = await ClientSchema.findById(req.params.id);
    return res.send({ client });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar cliente" });
  }
}

async function list(req, res) {
  try {
    const client = await ClientSchema.find();
    res.send({ client });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar clientes" });
  }
}

async function update(req, res) {
  try {
    const client = await ClientSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.send({ client });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar cliente" });
  }
}

async function remove(req, res) {
  try {
    await ClientSchema.findByIdAndRemove(req.params.id);
    return res.status(200).send();
  } catch (err) {
    return res.status(400).send({ error: "Erro ao deletar clientes", err });
  }
}

module.exports = { create, index, list, update, remove };
