const express = require("express");

const authMiddleware = require("./src/app/middleware/auth");

const user = require("./src/app/controllers/user.controller");
const auth = require("./src/app/controllers/authorization.controller");
const client = require("./src/app/controllers/client.controller");
const receiver = require("./src/app/controllers/receiver.controller");
const package = require("./src/app/controllers/package.controller");
const transaction = require("./src/app/controllers/transactions.controller");
const cargo = require("./src/app/controllers/cargo.controller");
const financial = require("./src/app/controllers/financial.controller");
const business = require("./src/app/controllers/business.controller");

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
transactionRouter.put("/delivered/:id", transaction.delivered);
transactionRouter.put("/sented/:id", transaction.sented);

// Cargo
const cargoRouter = express.Router();
cargoRouter.use(authMiddleware);
cargoRouter.post("/create", cargo.create);
cargoRouter.get("/", cargo.index);
cargoRouter.get("/all", cargo.list);
cargoRouter.get("/one/:id", cargo.getOne);
cargoRouter.put("/finish/:id", cargo.finishCargo);
cargoRouter.get("/not-finish", cargo.getNotFinish);
cargoRouter.put("/finish-delivery/:id", cargo.finishDelivery);

const financialRouter = express.Router();
financialRouter.use(authMiddleware);
financialRouter.get("/list-by-client/:id", financial.listTransactionsByClient);
financialRouter.get(
  "/list-by-client-and-month/:id/:month",
  financial.listTransactionsByClientAndMonth
);
financialRouter.put("/make-payment", financial.makePayment);

const businessRouter = express.Router();
businessRouter.use(authMiddleware);
businessRouter.get("/list-by-month", business.listTransactionsByMonth);
businessRouter.get("/list-by-year-and-month/:year/:month", business.listTransactionsByYearAndMonth);

module.exports = {
  rootRouter,
  userRouter,
  clientRouter,
  receiverRouter,
  packageRouter,
  transactionRouter,
  cargoRouter,
  financialRouter,
  businessRouter
};
