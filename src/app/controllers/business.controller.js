const TransactionSchema = require("../models/transactions");
const ClientSchema = require("../models/client");
const mongoose = require("../../database");
var ObjectId = require("mongodb").ObjectID;

async function listTransactionsByMonth(req, res) {
  try {
    const months = await TransactionSchema.aggregate([
      {
        $group: {
          _id: { month: "$month", year: "$year" },

          total: {
            $sum: "$total",
          },
          paid_value: {
            $sum: {
              $cond: [{ $eq: ["$paid", true] }, "$total", 0],
            },
          },
          not_paid_value: {
            $sum: {
              $cond: [{ $eq: ["$paid", false] }, "$total", 0],
            },
          },
          count: {
            $sum: {
              $reduce: {
                input: {
                  $filter: {
                    input: "$volumes",
                    as: "volumes",
                    cond: { $eq: ["$$volumes.paid_now", true] },
                  },
                },
                initialValue: 0,
                in: { $sum: ["$$value", "$$this.amount"] },
              },
            },
          },
          // count: {
          //   $sum: {
          //     $size: {
          //       $filter: {
          //         input: "$volumes",
          //         as: "volumes",
          //         cond: { $eq: ["$$volumes.paid_now", true] },
          //       },
          //     },
          //   },
          // },
        },
      },
    ]);

    return res.send({ months });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Erro ao buscar transações" });
  }
}

async function listTransactionsByYearAndMonth(req, res) {
  try {
    const transactions = await TransactionSchema.find({
      year: req.params.year,
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

module.exports = {
  listTransactionsByMonth,
  listTransactionsByYearAndMonth,
};
