const express = require("express");
const { Worker } = require("worker_threads");
const client = require("prom-client");
const { register } = require("module");

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const app = express();

app.get("/", (req, res) => {
  res.send("Nodejs multithreading");
});

// non-blocked thread
app.get("/non-blocking", (req, res) => {
  res.status(200).send("Non-blocking page");
});

// will block the main thread
app.get("/blocking", async (req, res) => {
  const worker = new Worker("./worker.js");

  worker.on("message", (data) => {
    res.status(200).send(`the result is ${data}`);
  });

  worker.on("error", (error) => {
    res.status(404).send(`Error: ${error}`);
  });
});

// metrics
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

app.listen(3000, () => {
  console.log("app running on port 3000");
});
