const express = require("express");
require("express-async-errors");

const { conf } = require("./conf");
const { helloRouter } = require("./hello/controller");

const app = express();
app.use(express.static(conf.dist));
app.use(express.json());
app.use(conf.ep.api, helloRouter);

module.exports = { app };
