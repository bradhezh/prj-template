import express from "express";

import { hello } from "./service";

export const helloRouter = express.Router();

helloRouter.get("/", (_req, res) => {
  res.send(hello());
});

export default helloRouter;
