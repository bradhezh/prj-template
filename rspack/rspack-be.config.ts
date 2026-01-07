import { defineConfig } from "@rspack/cli";
import { ExternalItem } from "@rspack/core";
import nodeExternals from "webpack-node-externals";
import { TsCheckerRspackPlugin } from "ts-checker-rspack-plugin";
import { RunScriptWebpackPlugin } from "run-script-webpack-plugin";
import path from "path";

const dev = process.env.NODE_ENV === "development";

export default defineConfig({
  target: ["node22", "es2023"],
  mode: !dev ? "production" : "development",

  entry: !dev
    ? path.join(__dirname, "src", "main.ts")
    : ["@rspack/core/hot/poll?100", path.join(__dirname, "src", "main.ts")],
  output: { path: path.join(__dirname, "build"), clean: true },

  resolve: {
    extensions: [".ts", "..."],
    tsConfig: path.join(__dirname, "tsconfig.json"),
  },

  externals: [
    nodeExternals({ allowlist: [/@rspack\/core\/hot\/.*/] }) as ExternalItem,
  ],
  externalsType: "commonjs",

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "builtin:swc-loader",
          options: { jsc: { target: "es2023" } },
        },
      },
    ],
  },

  devServer: { devMiddleware: { writeToDisk: true } },

  plugins: [
    new TsCheckerRspackPlugin(),
    dev && new RunScriptWebpackPlugin({ name: "main.js", autoRestart: false }),
  ].filter(Boolean),
});
