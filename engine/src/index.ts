import * as Logger from './logger';
import * as Workers from './workers';

// TEST DATA
import * as TEST from './test';
const test01 = TEST.REPEAT;
const test02 = TEST.JOIN_ALL;
const test03 = TEST.JOIN_FIRST;
const test04 = TEST.VARIABLE;

const data = {
  workers: [
    {
      type: 'web',
      config: {
        port: 3002
      },
      exec: [
        {
          id: 'REPEAT',
          type: 'flow',
          config: {
            method: 'GET',
            path: '/test/:repeat'
          },
          data: test01
        },
        {
          id: 'JOIN_ALL',
          type: 'flow',
          config: {
            method: 'GET',
            path: '/all'
          },
          data: test02
        },
        {
          id: 'JOIN_FIRST',
          type: 'flow',
          config: {
            method: 'GET',
            path: '/first'
          },
          data: test03
        },
        {
          id: 'VARIABLE',
          type: 'flow',
          config: {
            method: 'GET',
            path: '/var'
          },
          data: test04
        }
      ]
    }
  ]
};
//

// WORKERS

const runningWorkers = [];
Logger.info('Starting workers...');

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

Logger.info('Workers started');

// ??

// STOP

process.on('SIGTERM', (code) => {
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

