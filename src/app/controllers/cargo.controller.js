const CargoSchema = require("../models/cargo");
const TransactionSchema = require("../models/transactions");

var ObjectId = require("mongodb").ObjectID;

async function create(req, res) {
  try {
    if (await CargoSchema.findOne({ open: true })) return;

    let cargo = await CargoSchema.findOne({ date: req.body.date });

    if (cargo) {
      await CargoSchema.findByIdAndUpdate(
        cargo._id,
        { open: true },
        {
          new: true,
        }
      );
      return res.send({ cargo });
    } else {
      cargo = await CargoSchema.create(req.body);
      return res.send({ cargo });
    }
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

async function list(req, res) {
  try {
    // const cargos = await CargoSchema.find({ open: false }).populate({path: "packages", select: "volumes"});
    const cargos = await CargoSchema.find({ open: false }).populate({
      path: "packages",
      select: "paid total volumes",
    });

    // .populate("packages", "paid total")
    // .populate("packages", "volumes");

    return res.send({ cargos });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar entregas" });
  }
}

async function finishCargo(req, res) {
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

async function getOne(req, res) {
  try {
    const cargo = await CargoSchema.findOne({ _id: req.params.id }).populate({
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

async function getNotFinish(req, res) {
  try {
    const cargo = await CargoSchema.findOne({ finished: false }).populate({
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

async function finishDelivery(req, res) {
  try {
    const cargo = await CargoSchema.findByIdAndUpdate(
      req.params.id,
      { finished: true },
      {
        new: true,
      }
    );
    return res.send({ cargo });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar cliente" });
  }
}

async function makePayment(req, res) {
  try {
    const { _id, paid } = req.body.transaction;
    console.log(_id, paid);
    await TransactionSchema.update(
      { _id: ObjectId(_id) },
      { $set: { paid: paid, payday: new Date() } }
    );

    return res.send();
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Erro realizar pagamento" });
  }
}

module.exports = {
  create,
  index,
  finishCargo,
  list,
  getOne,
  getNotFinish,
  makePayment,
  finishDelivery,
};
