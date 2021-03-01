const ReceiverSchema = require("../models/receiver");
const TransactionSchema = require("../models/transactions");

async function create(req, res) {
  try {
    const receiver = await ReceiverSchema.create(req.body);

    return res.send({ receiver });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Erro ao cadastrar destinatário" });
  }
}

async function index(req, res) {
  try {
    const receiver = await ReceiverSchema.findById(req.params.id);
    return res.send({ receiver });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar destinatário" });
  }
}

async function list(req, res) {
  try {
    const receiver = await ReceiverSchema.find();
    res.send({ receiver });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar destinatários" });
  }
}

async function update(req, res) {
  try {
    const receiver = await ReceiverSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.send({ receiver });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar destinatário" });
  }
}

async function remove(req, res) {
  try {
    if (await TransactionSchema.findOne({ receiver: req.params.id })) {
      return res.status(400).send({
        error:
          "Destinatário não pode ser deletado por ter pendências dentro do sistema",
        err,
      });
    }
    await ReceiverSchema.findByIdAndRemove(req.params.id);
    return res.status(200).send();
  } catch (err) {
    return res.status(400).send({ error: "Erro ao deletar destinatário", err });
  }
}

module.exports = { create, index, list, update, remove };
