const { defineConfig } = require("@rspack/cli");
const nodeExternals = require("webpack-node-externals");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");
const path = require("node:path");

const dev = process.env.NODE_ENV === "development";

export default defineConfig({
  target: ["node22", "es2023"],
  mode: !dev ? "production" : "development",

  entry: !dev
    ? path.join(__dirname, "src", "main.js")
    : ["@rspack/core/hot/poll?100", path.join(__dirname, "src", "main.js")],
  output: { path: path.join(__dirname, "build"), clean: true },

  externals: [nodeExternals({ allowlist: [/@rspack\/core\/hot\/.*/] })],
  externalsType: "commonjs",

  devServer: { devMiddleware: { writeToDisk: true } },

  plugins: [
    dev && new RunScriptWebpackPlugin({ name: "main.js", autoRestart: false }),
  ].filter(Boolean),
});
