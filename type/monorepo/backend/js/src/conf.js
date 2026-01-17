const dotenv = require("dotenv");

const common = require("../../shared/src/conf");

dotenv.config();

const conf = {
  ...common.conf,
  env: process.env.NODE_ENV!,
  port: Number(process.env.PORT) || 3001,
};

module.exports = { ...(({conf: _c, ...rest}) => rest)(common), conf, };
