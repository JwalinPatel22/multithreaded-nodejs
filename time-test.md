### curl command to test the response time

```curl
time curl --get http://localhost:3000/blocking
```

### test results

| Test Scenario                | Implementation File                              | Worker Thread Count | Real Time (seconds) |
| :--------------------------- | :----------------------------------------------- | :------------------ | :------------------ |
| **Original (Baseline)**      | [`./index.js`](./index.js)                       | 1                   | 38.474              |
| **Multi-threaded**           | [`./index-12-workers.js`](./index-12-workers.js) | 4                   | 10.275              |
| **Optimized Multi-threaded** | [`./index-12-workers.js`](./index-12-workers.js) | 12                  | 4.417               |

```js
const THREAD_COUNT = 12; //change this line
```
