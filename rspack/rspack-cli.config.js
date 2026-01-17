const { defineConfig } = require("@rspack/cli");
const nodeExternals = require("webpack-node-externals");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");
const path = require("node:path");

const dev = process.env.NODE_ENV === "development";

export default defineConfig({
  target: "node",
  mode: !dev ? "production" : "development",

  entry: { index: path.join(__dirname, "src", "index.js") },
  output: { clean: true },

  externals: [nodeExternals()],
  externalsType: "commonjs",

  devServer: { devMiddleware: { writeToDisk: true } },

  plugins: [dev && new RunScriptWebpackPlugin({ name: "index.js" })].filter(
    Boolean,
  ),
});
