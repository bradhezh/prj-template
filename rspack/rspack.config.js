const { defineConfig } = require("@rspack/cli");
const nodeExternals = require("webpack-node-externals");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");
const path = require("node:path");

const dev = process.env.NODE_ENV === "development";

module.exports = defineConfig({
  target: ["node22", "es2023"],
  mode: !dev ? "production" : "development",

  entry: path.join(__dirname, "src", "main.js"),
  output: { path: path.join(__dirname, "build"), clean: true },

  externals: [nodeExternals()],
  externalsType: "commonjs",

  devServer: { devMiddleware: { writeToDisk: true } },

  plugins: [dev && new RunScriptWebpackPlugin({ name: "main.js" })].filter(
    Boolean,
  ),
});
