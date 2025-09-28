const { parentPort } = require("worker_threads");

let counter = 0;
for (let i = 0; i < 20_000_000_000; i++) {
  counter++;
}

// postMessage is the way you communicate with the main thread from a worker(different thread)
parentPort.postMessage(counter);