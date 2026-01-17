import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

const rules = {
  "no-cond-assign": ["warn", "always"],
  eqeqeq: "warn",
  "no-unused-vars": [
    "error",
    { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
  ],
};

export default defineConfig([
  {
    files: ["*.{js,mjs}"],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
    rules,
  },
]);
