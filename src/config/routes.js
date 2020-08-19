const express = require("express");

const routes = express.Router();

const usuario = require("../app/controllers/usuario.controller");

routes.get("/usuario", usuario.index);

module.exports = routes;
