import dotenv from "dotenv";

dotenv.config();

export const env = {
  dev: "development",
  prod: "production",
  debug: "debug",
  test: "test",
} as const;

const conf = {
  env: process.env.NODE_ENV!,
  port: Number(process.env.PORT) || 3001,
  dist: "dist",
  ep: { api: "/api" },
  dbUrl: process.env.DB_URL!,
} as const;

export default { ...conf } as const;
