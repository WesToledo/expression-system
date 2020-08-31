const express = require("express");

const authMiddleware = require("./src/app/middleware/auth");

const user = require("./src/app/controllers/user.controller");
const auth = require("./src/app/controllers/authorization.controller");
const client = require("./src/app/controllers/client.controller");

//Auth
const rootRouter = express.Router();

rootRouter.post("/login", auth.login);

// Users
const userRouter = express.Router();

userRouter.use(authMiddleware);

userRouter.post("/create", authMiddleware, user.create);
userRouter.get("/", authMiddleware, user.list);
userRouter.get("/:id", authMiddleware, user.index);
userRouter.put("/update/:id", authMiddleware, user.update);
userRouter.delete("/remove/:id", authMiddleware, user.remove);

// Client
const clientRouter = express.Router();

clientRouter.use(authMiddleware);

clientRouter.post("/create", authMiddleware, client.create);
clientRouter.get("/", authMiddleware, client.list);
clientRouter.get("/:id", authMiddleware, client.index);
clientRouter.put("/update/:id", authMiddleware, client.update);
clientRouter.delete("/remove/:id", authMiddleware, client.remove);

module.exports = { rootRouter, userRouter, clientRouter };
