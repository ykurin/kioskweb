import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import apiRouter from "./routes/api.routes.js";
import "./utils/scheduler.js";

process.env.TZ = "Europe/Moscow";
const PORT = process.env.PORT || 8080;
const nodeEnv = process.env.NODE_ENV || "production";
const app = express();
app.use(compression({ filter: shouldCompress }));

function shouldCompress(req: Request, res: Response) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}
// app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/", apiRouter);

app.get("/", (_req, res) => {
  console.log("asked");
  res.send(`ok: ${nodeEnv}`);
});

app.listen(PORT, () => {
  console.log(`===\n   ${new Date()}\n   Server listening on ${PORT}`);
});
