import dotenv from "dotenv";

dotenv.config();

export const env = {
  dev: "development",
  prod: "production",
  debug: "debug",
  test: "test",
} as const;

const conf = {
  ep: { api: "/api" },
  env: process.env.NODE_ENV!,
  port: Number(process.env.PORT) || 3001,
} as const;

export default {
  ...conf,
} as const;
