const express = require("express");
const { Worker } = require("worker_threads");

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

app.listen(3000, () => {
  console.log("app running on port 3000");
});
