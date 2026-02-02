import express from "express";

import { hello } from "./service";

export const helloRouter = express.Router();

helloRouter.get("/", (_req, res) => {
  res.json(hello());
});

export default helloRouter;
