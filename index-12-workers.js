// multithreading using 12 cpu cores
const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const THREAD_COUNT = 15; //jk only 4 threads

app.get("/", (req, res) => {
  res.send("Nodejs multithreading");
});

// non-blocked thread
app.get("/non-blocking", (req, res) => {
  res.status(200).send("Non-blocking page");
});

function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./12-workers.js", {
      workerData: { thread_count: THREAD_COUNT },
    });
    worker.on("message", (data) => {
      resolve(data);
    });

    worker.on("error", (error) => {
      reject(`Error: ${error}`);
    });
  });
}

// will block the main thread
app.get("/blocking", async (req, res) => {
  const workerPromises = [];
  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
  }

  const thread_result = await Promise.all(workerPromises);
  let total = thread_result.reduce((sum, value) => sum + value, 0);
  res.status(200).send(`the result is ${total}`);
});

app.listen(3000, () => {
  console.log("app running on port 3000");
});
