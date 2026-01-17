const express = require("express");

const { conf } = require("../conf");
const { hello } = require("./service");

const helloRouter = express.Router();

helloRouter.get("/", (_req, res) => {
  res.json(hello());
});

module.exports = helloRouter;
