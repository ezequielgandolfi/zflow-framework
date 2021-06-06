import express from "express";
import * as fs from "fs";
import * as path from "path";

import { Logger } from "./logger";
import { Database } from "./db";

const PORT = process.env.PORT || 3001;
const app = express();
const db = new Database();

// API

app.get("/api", (req, res) => {
  res.json({ message: "Hello from ZFlow Studio!" });
});

app.get("/api/dashboard/history", async (req, res) => {
  const items = await db.dashboardHistory();
  res.json({ items });
});

app.get("/api/diagrams", async (req, res) => {
  const items = await db.getDiagrams();
  res.json({ items });
});

app.post("/api/test", async (req, res) => {
  let data = '';

  // build body data
  req.on('data', (chunk) => {
      data += chunk;
  });
  // end request
  req.on('end', () => {
    try {
      // TEST PURPOSES ONLY...
      fs.writeFileSync("C:\\workspace\\github\\zflow-framework\\test.json", data);
      res.json({ ok: true });  
    }
    catch {
      res.json({ ok: false });  
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../studio/build", "index.html"));
});

app.use(express.static(path.resolve(__dirname, "../studio/build")));

app.listen(PORT, () => {
  Logger.info(`API Server listening on ${PORT}`);
  db.setupConnection();
});
