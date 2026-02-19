import express from "express";
import "express-async-errors";

import conf from "@/conf";
import { helloRouter } from "@/hello";

export const app = express();
app.get("/health-check", (_req, res) => {
  res.send("OK");
});
app.use(express.static(conf.dist));
app.use(express.json());
app.use(conf.ep.api, helloRouter);
