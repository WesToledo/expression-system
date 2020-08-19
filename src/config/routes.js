const express = require("express");

const routes = express.Router();

const user = require("../app/controllers/user.controller");

// Users
routes.post("/user/create", user.create);
routes.get("/user/", user.list);
routes.get("/user/:id", user.index);
routes.put("/user/:id", user.update);
routes.delete("/user/:id", user.remove);




module.exports = routes;
