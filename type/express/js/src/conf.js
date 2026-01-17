const dotenv = require("dotenv");

dotenv.config();

const env = {
  dev: "development",
  prod: "production",
  debug: "debug",
  test: "test",
};

const conf = {
  ep: { api: "/api" },
  env: process.env.NODE_ENV!,
  port: Number(process.env.PORT) || 3001,
  dist: "dist",
};

module.exports = { env, conf };
