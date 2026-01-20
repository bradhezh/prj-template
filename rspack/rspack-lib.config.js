const { defineConfig } = require("@rspack/cli");
const nodeExternals = require("webpack-node-externals");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");
const { join } = require("node:path");

const dev = process.env.NODE_ENV === "development";
const cli = process.env.CLI === "true";

module.exports = defineConfig({
  target: "node",
  mode: !dev ? "production" : "development",

  entry: {
    index: join(__dirname, "src", "index.js"),
    ...(!dev || cli ? {} : { user: join(__dirname, "src", "user.js") }),
  },
  output: { library: { type: "commonjs" }, clean: true },

  externals: [nodeExternals()],
  externalsType: "commonjs",

  devServer: { devMiddleware: { writeToDisk: true } },

  plugins: [
    dev && new RunScriptWebpackPlugin({ name: cli ? "index.js" : "user.js" }),
  ].filter(Boolean),
});
