const TransactionSchema = require("../models/transactions");
const CargoSchema = require("../models/cargo");

async function create(req, res) {
  try {
    const transaction = await TransactionSchema.create(req.body);

    const cargo = await CargoSchema.findOne({ open: true }).populate(
      "packages"
    );

    cargo.packages.push(transaction._id);
    cargo.save();

    return res.send({ transaction });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: "Erro ao cadastrar volume carregamento" });
  }
}

async function index(req, res) {
  try {
    const transaction = await TransactionSchema.findOne({ _id: req.params.id });

    return res.send({ transaction });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Erro ao buscar volume " });
  }
}

async function list(req, res) {
  try {
    const transaction = await TransactionSchema.find()
      .populate({ path: "client", select: "name" })
      .populate({ path: "receiver", select: "name" })
      .lean();

    res.send({ transaction });
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Erro ao buscar volumes carregamento" });
  }
}

async function remove(req, res) {
  try {
  } catch (err) {}
}

module.exports = { create, index, list, remove };
