const express = require("express");

const authMiddleware = require("./src/app/middleware/auth");

const user = require("./src/app/controllers/user.controller");
const auth = require("./src/app/controllers/authorization.controller");
const client = require("./src/app/controllers/client.controller");
const receiver = require("./src/app/controllers/receiver.controller");
const package = require("./src/app/controllers/package.controller");
const transaction = require("./src/app/controllers/transactions.controller");
const cargo = require("./src/app/controllers/cargo.controller");

//Auth
const rootRouter = express.Router();
rootRouter.post("/login", auth.login);

// Users
const userRouter = express.Router();
userRouter.use(authMiddleware);
userRouter.post("/create", user.create);
userRouter.get("/", user.list);
userRouter.get("/:id", user.index);
userRouter.put("/update/:id", user.update);
userRouter.delete("/remove/:id", user.remove);

// Client
const clientRouter = express.Router();
clientRouter.use(authMiddleware);
clientRouter.post("/create", client.create);
clientRouter.get("/", client.list);
clientRouter.get("/:id", client.index);
clientRouter.put("/update/:id", client.update);
clientRouter.delete("/remove/:id", client.remove);

// Receiver
const receiverRouter = express.Router();
receiverRouter.use(authMiddleware);
receiverRouter.post("/create", receiver.create);
receiverRouter.get("/", receiver.list);
receiverRouter.get("/:id", receiver.index);
receiverRouter.put("/update/:id", receiver.update);
receiverRouter.delete("/remove/:id", receiver.remove);

// Package
const packageRouter = express.Router();
packageRouter.use(authMiddleware);
packageRouter.post("/create", package.create);
packageRouter.get("/", package.list);
packageRouter.get("/:id", package.index);
packageRouter.put("/update/:id", package.update);
packageRouter.delete("/remove/:id", package.remove);

// Transaction
const transactionRouter = express.Router();
transactionRouter.use(authMiddleware);
transactionRouter.post("/create", transaction.create);
transactionRouter.get("/", transaction.list);
transactionRouter.get("/:id", transaction.index);
transactionRouter.delete("/remove/:id", transaction.remove);

// Cargo
const cargoRouter = express.Router();
cargoRouter.use(authMiddleware);
cargoRouter.post("/create", cargo.create);
cargoRouter.get("/", cargo.index);
cargoRouter.put("/finish/:id", cargo.finish);


module.exports = {
  rootRouter,
  userRouter,
  clientRouter,
  receiverRouter,
  packageRouter,
  transactionRouter,
  cargoRouter,
};
