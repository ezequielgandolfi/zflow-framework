const workers = require("./workers");
const logger = require("./logger");
const test01 = require("../test-repeat.json");

const runningWorkers = [];

logger.info(process.version);

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
            path: "/test/:param1"
          },
          data: test01
        }
      ]
    }
  ]
};

// WORKERS

logger.info("Starting workers...");

data.workers.forEach(w => {
  // try {
    logger.info(`Worker type: ${w.type}`);
    const worker = new workers[w.type](w.config, w.exec);
    const description = worker.description;
    logger.info(`${description} init`);
    worker.init();
    logger.info(`${description} start`);
    worker.start();
    runningWorkers.push(worker);
    logger.info(`${description} is now active`);
  // }
  // catch {
  //   logger.error(`Error starting worker ${w.type}`);
  // }
});

logger.info("Workers started");

// ??

// STOP

process.on("SIGTERM", (code) => {
  runningWorkers.forEach(worker => {
    try {
      const description = worker.description;
      logger.info(`${description} stop`);
      worker.stop();
      logger.info(`${description} end`);
      worker.end();
      logger.info(`${description} is now inactive`);
    }
    catch {
      logger.error('Error stopping worker')
    }
  });
});

