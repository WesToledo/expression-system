const TransactionSchema = require("../models/transactions");
const CargoSchema = require("../models/cargo");
const ClientSchema = require("../models/client");
const mongoose = require("../../database");
var ObjectId = require("mongodb").ObjectID;

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
    })
      .populate("receiver", "name")
      .populate("client", "name");

    return res.send({ transactions });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Erro ao buscar transações" });
  }
}

async function makePayment(req, res) {
  try {
    await req.body.transactions.forEach(async (transaction) => {
      await TransactionSchema.update(
        { _id: ObjectId(transaction) },
        { $set: { paid: true, payday: new Date() } }
      );
    });

    return res.send();
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Erro realizar pagamento" });
  }
}

module.exports = {
  listTransactionsByClient,
  listTransactionsByClientAndMonth,
  makePayment,
};
