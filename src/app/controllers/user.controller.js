const UserSchema = require("../models/user");

async function create(req, res) {
  try {
    const { login } = req.body;
    if (await UserSchema.findOne({ login })) {
      return res.status(400).send({ error: "Login already exists" });
    }
    const user = await UserSchema.create(req.body);
    user.password = undefined;

    return res.send({ user });
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Error on create user", message: err });
  }
}

async function index(req, res) {
  try {
    const user = await UserSchema.findById(req.params.id);
    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Error on get user" });
  }
}

async function list(req, res) {
  try {
    const user = await UserSchema.find();
    res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Error on get users" });
  }
}

async function update(req, res) {
  try {
    const user = await UserSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Error on update user" });
  }
}

async function remove(req, res) {
  try {
    await UserSchema.findByIdAndRemove(req.params.id);
    return res.status(200).send();
  } catch (err) {
    return res.status(400).send({ error: "Error on remove user", err });
  }
}

module.exports = { create, index, list, update, remove };
