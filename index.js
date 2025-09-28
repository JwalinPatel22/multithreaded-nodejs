const express = require("express");

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
  // simulating some heavy computation
  let counter = 0;
  for (let i = 0; i < 20_000_000_000; i++) {
    counter++;
  }
  res.status(200).send(`the result is ${counter}`);
});

app.listen(3000, () => {
  console.log("app running on port 3000");
});
