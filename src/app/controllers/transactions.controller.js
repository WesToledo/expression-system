const TransactionSchema = require("../models/transactions");
const CargoSchema = require("../models/cargo");

function getDate() {
  return new Date().toISOString();
}

function getMonthAndYear() {
  let now = new Date();
  return { month: now.getMonth() + 1, year: now.getFullYear() };
}

async function create(req, res) {
  try {
    const transaction = await TransactionSchema.create({
      ...req.body,
      ...getMonthAndYear(),
    });

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
    await TransactionSchema.findByIdAndRemove(req.params.id);
    return res.status(200).send();
  } catch (err) {
    return res.status(400).send({ error: "Erro ao deletar carregamento", err });
  }
}

async function delivered(req, res) {
  try {
    const delivered = await TransactionSchema.findByIdAndUpdate(
      req.params.id,
      { delivered: req.body.checked },
      {
        new: true,
      }
    )
      .populate("client", "name")
      .populate("receiver", "name");
    return res.send({ package: delivered });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar carregamento" });
  }
}

async function sented(req, res) {
  try {
    const sented = await TransactionSchema.findByIdAndUpdate(
      req.params.id,
      { sent: req.body.checked },
      {
        new: true,
      }
    )
      .populate("client", "name")
      .populate("receiver", "name");
    return res.send({ package: sented });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar carregamento" });
  }
}

module.exports = { create, index, list, remove, delivered, sented };
