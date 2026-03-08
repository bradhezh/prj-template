const { defineConfig } = require("@rspack/cli");
const { rspack } = require("@rspack/core");
const nodeExternals = require("webpack-node-externals");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");
const { join } = require("node:path");

const dev = process.env.NODE_ENV === "development";

module.exports = defineConfig({
  target: "node",
  mode: !dev ? "production" : "development",

  entry: { index: join(__dirname, "src", "index.js") },
  output: { clean: true },

  externals: [nodeExternals()],
  externalsType: "commonjs",

  ...(!dev && { devtool: "nosources-source-map" }),

  devServer: { devMiddleware: { writeToDisk: true } },

  plugins: [
    new rspack.BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true,
      entryOnly: true,
    }),
    dev && new RunScriptWebpackPlugin({ name: "index.js" }),
  ].filter(Boolean),
});
