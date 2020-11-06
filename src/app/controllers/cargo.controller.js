const CargoSchema = require("../models/cargo");
const TransactionSchema = require("../models/transactions");

async function create(req, res) {
  try {
    if (await CargoSchema.findOne({ open: true })) return;

    const cargo = await CargoSchema.create(req.body);

    return res.send({ cargo });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao criar carregamento" });
  }
}

async function index(req, res) {
  try {
    const cargo = await CargoSchema.findOne({ open: true }).populate({
      path: "packages",
      populate: [
        {
          path: "client",
          select: "name",
        },
        {
          path: "receiver",
          select: "name",
        },
      ],
    });

    return res.send({ cargo });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar carregamento" });
  }
}

async function finish(req, res) {
  try {
    const cargo = await CargoSchema.findByIdAndUpdate(
      req.params.id,
      { open: false, total: req.body.total },
      {
        new: true,
      }
    );
    return res.send({ cargo });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar cliente" });
  }
}

module.exports = { create, index, finish };
