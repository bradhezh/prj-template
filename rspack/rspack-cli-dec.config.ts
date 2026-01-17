import { defineConfig } from "@rspack/cli";
import { rspack, ExternalItem } from "@rspack/core";
import nodeExternals from "webpack-node-externals";
import { TsCheckerRspackPlugin } from "ts-checker-rspack-plugin";
import { RunScriptWebpackPlugin } from "run-script-webpack-plugin";
import path from "node:path";

const dev = process.env.NODE_ENV === "development";

export default defineConfig({
  target: "node",
  mode: !dev ? "production" : "development",

  entry: { index: path.join(__dirname, "src", "index.ts") },
  output: { clean: true },

  resolve: {
    extensions: [".ts", "..."],
    tsConfig: path.join(__dirname, "tsconfig.json"),
  },

  externals: [
    nodeExternals({ allowlist: ["reflect-metadata"] }) as ExternalItem,
  ],
  externalsType: "commonjs",

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: { syntax: "typescript", decorators: true },
              transform: { legacyDecorator: true, decoratorMetadata: true },
            },
          },
        },
      },
    ],
  },

  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin({
        minimizerOptions: {
          compress: { keep_classnames: true, keep_fnames: true },
          mangle: { keep_classnames: true, keep_fnames: true },
        },
      }),
    ],
  },

  devServer: { devMiddleware: { writeToDisk: true } },

  plugins: [
    new TsCheckerRspackPlugin(),
    dev && new RunScriptWebpackPlugin({ name: "index.js" }),
  ].filter(Boolean),
});
