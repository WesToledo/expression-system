const ClientSchema = require("../models/client");

async function create(req, res) {
  try {
    const client = await ClientSchema.create(req.body);

    return res.send({ client });
  } catch (err) {
    return res.status(400).send({ error: "Error on create client" });
  }
}

async function index(req, res) {
  try {
    const client = await ClientSchema.findById(req.params.id);
    return res.send({ client });
  } catch (err) {
    return res.status(400).send({ error: "Error on get client" });
  }
}

async function list(req, res) {
  try {
    const client = await ClientSchema.find();
    res.send({ client });
  } catch (err) {
    return res.status(400).send({ error: "Error on get clients" });
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
    return res.status(400).send({ error: "Error on update client" });
  }
}

async function remove(req, res) {
  try {
    await ClientSchema.findByIdAndRemove(req.params.id);
    return res.status(200).send();
  } catch (err) {
    return res.status(400).send({ error: "Error on remove client", err });
  }
}

module.exports = { create, index, list, update, remove };
