const PackageSchema = require("../models/package");

async function create(req, res) {
  try {
    const { name, price } = req.body;

    const package = await PackageSchema.create({
      name,
      price: price.replace(",", "."),
    });

    return res.send({ package });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Erro ao cadastrar volume" });
  }
}

async function index(req, res) {
  try {
    const package = await PackageSchema.findById(req.params.id);
    return res.send({ package });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar volume" });
  }
}

async function list(req, res) {
  try {
    const package = await PackageSchema.find();
    res.send({ package });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar volumes" });
  }
}

async function update(req, res) {
  try {
    const package = await PackageSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.send({ package });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar volume" });
  }
}

async function remove(req, res) {
  try {
    await PackageSchema.findByIdAndRemove(req.params.id);
    return res.status(200).send();
  } catch (err) {
    return res.status(400).send({ error: "Erro ao deletar volume", err });
  }
}

module.exports = { create, index, list, update, remove };
