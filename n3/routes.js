const express = require("express");

const VinhoController = require("./src/controller/vinhoController");

const routes = express.Router();

routes.post("/vinho", VinhoController.create);
routes.get("/vinho/", VinhoController.getAll);
routes.get("/vinho/:nome", VinhoController.getByName);
routes.delete("/vinho/:id", VinhoController.deleteById);


module.exports = routes;