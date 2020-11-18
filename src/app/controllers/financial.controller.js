const TransactionSchema = require("../models/transactions");
const CargoSchema = require("../models/cargo");
const ClientSchema = require("../models/client");
const mongoose = require("../../database");

async function listTransactionsByClient(req, res) {
  try {
    const client = await ClientSchema.findOne({ _id: req.params.id }).lean();

    client.deliverys = await TransactionSchema.aggregate([
      {
        $match: {
          client: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $group: {
          _id: "$month",
          total: {
            $sum: "$total",
          },
        },
      },
    ]);

    return res.send({ client });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Erro ao buscar compras" });
  }
}

async function listTransactionsByClientAndMonth(req, res) {
  try {
    const transactions = await TransactionSchema.find({
      client: req.params.id,
      month: req.params.month,
    });

    return res.send({ transactions });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Erro ao buscar transações" });
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
      { delivered: true },
      {
        new: true,
      }
    )
      .populate("client", "name")
      .populate("receiver", "name");
    return res.send({ package: delivered });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar cliente" });
  }
}

module.exports = { listTransactionsByClient, listTransactionsByClientAndMonth };
