import * as Logger from "./logger";
import * as Workers from "./workers";

// TEST DATA
import * as TEST from "./test";
const test01 = TEST.REPEAT;

const data = {
  workers: [
    {
      type: "web",
      config: {
        port: 3002
      },
      exec: [
        {
          id: "ABC",
          type: "flow",
          config: {
            method: "GET",
            path: "/test/:repeat"
          },
          data: test01
        }
      ]
    }
  ]
};
//

// WORKERS

const runningWorkers = [];
Logger.info("Starting workers...");

data.workers.forEach(w => {
  // try {
    Logger.info(`Worker type: ${w.type}`);
    const worker = new Workers.Type[w.type](w.config, w.exec);
    const description = worker.description;
    Logger.info(`${description} init`);
    worker.init();
    Logger.info(`${description} start`);
    worker.start();
    runningWorkers.push(worker);
    Logger.info(`${description} is now active`);
  // }
  // catch {
  //   logger.error(`Error starting worker ${w.type}`);
  // }
});

Logger.info("Workers started");

// ??

// STOP

process.on("SIGTERM", (code) => {
  runningWorkers.forEach(worker => {
    try {
      const description = worker.description;
      Logger.info(`${description} stop`);
      worker.stop();
      Logger.info(`${description} end`);
      worker.end();
      Logger.info(`${description} is now inactive`);
    }
    catch {
      Logger.error('Error stopping worker')
    }
  });
});

