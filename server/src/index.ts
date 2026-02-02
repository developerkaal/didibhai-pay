import { app } from "./app.js";
import { env } from "./config/env.js";
import { initQueueWorker } from "./lib/queue.js";

const port = env.PORT;

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

initQueueWorker();
