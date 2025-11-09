### curl command to test the response time

```curl
time curl --get http://localhost:3000/blocking
```

```js
const THREAD_COUNT = 12; //change this line
```

### test results

| Test Scenario                | Implementation File                              | Worker Thread Count | Real Time (seconds) |
| :--------------------------- | :----------------------------------------------- | :------------------ | :------------------ |
| **Original (Baseline)**      | [`./index.js`](./index.js)                       | 1                   | 38.474              |
| **Multi-threaded**           | [`./index-12-workers.js`](./index-12-workers.js) | 4                   | 10.275              |
| **Optimized Multi-threaded** | [`./index-12-workers.js`](./index-12-workers.js) | 12                  | 4.417               |

Relative speed to 1 thread
1 thread   : 1.00 | █

4 threads  : 3.74 | ████████

12 threads : 8.71 | ███████████████████
