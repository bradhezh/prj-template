import { defineConfig } from "@rspack/cli";
import { rspack, ExternalItem } from "@rspack/core";
import nodeExternals from "webpack-node-externals";
import { TsCheckerRspackPlugin } from "ts-checker-rspack-plugin";
import { RunScriptWebpackPlugin } from "run-script-webpack-plugin";
import path from "path";

const dev = process.env.NODE_ENV === "development";
const cli = process.env.CLI === "true";

export default defineConfig({
  target: "node",
  mode: !dev ? "production" : "development",

  entry: {
    index: "./src/index.ts",
    ...(!dev || cli ? {} : { user: "./src/user.ts" }),
  },
  output: {
    library: { type: "commonjs" },
    clean: true,
  },

  resolve: {
    extensions: [".ts", "..."],
    tsConfig: path.resolve(__dirname, "tsconfig.json"),
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
              parser: {
                syntax: "typescript",
                decorators: true,
              },
              transform: {
                legacyDecorator: true,
                decoratorMetadata: true,
              },
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
          compress: {
            keep_classnames: true,
            keep_fnames: true,
          },
          mangle: {
            keep_classnames: true,
            keep_fnames: true,
          },
        },
      }),
    ],
  },

  devServer: { devMiddleware: { writeToDisk: true } },

  plugins: [
    new TsCheckerRspackPlugin({
      typescript: { mode: dev ? "readonly" : "write-dts" },
    }),
    dev && new RunScriptWebpackPlugin({ name: cli ? "index.js" : "user.js" }),
  ].filter(Boolean),
});
