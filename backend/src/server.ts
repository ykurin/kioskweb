// import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from "express";
import cors from "cors";

import apiRouter from "./routes/api.routes.js";

import { sql } from "./database/database.js";
import "./utils/scheduler.js";

// dotenv.config();
process.env.TZ = "Europe/Moscow";

const PORT = process.env.PORT || 8080;
const nodeEnv = process.env.NODE_ENV || "production";

const app = express();
app.use(cors());

async function testCallDB() {
  try {
    console.log(` [${new Date()}] \nCalling Home API`);
    const tabababa = await sql`
      SHOW TIME ZONE;
    `;
    console.log(tabababa);
  } catch (error) {
    console.log(`${error}`);
  }
}

await testCallDB();

app.use("/", apiRouter);

app.listen(PORT, () => {
  console.log(`===\n   ${new Date()}\n   Server listening on ${PORT}`);
});

app.get("/", (_req, res) => {
  console.log("asked");
  res.send(`ok: ${nodeEnv}`);
});
