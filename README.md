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


# ⚙️ Performance Scaling Chart

This chart compares **execution time** and **speedup** as the number of worker threads increases.

```mermaid
%%{init: {
  "theme": "neutral",
  "config": {
    "xyChart": {
      "curve": "monotoneX"
    }
  },
  "themeVariables": {
    "background": "#fafafa",
    "fontFamily": "Inter,Segoe UI,Helvetica,Arial,sans-serif",
    "fontSize": "14px",
    "textColor": "#111827",
    "lineColor": "#2563eb",
    "lineWidth": 3
  }
}}%%
xychart-beta
  title "Performance Scaling — Execution Time vs Worker Threads"
  x-axis "Worker Threads" [1, 4, 12]
  y-axis "Execution Time (seconds)" 0 --> 40
  line "Execution Time" [38.474, 10.275, 4.417]
  bar "Speedup (×)" [1.0, 3.74, 8.71]

```
