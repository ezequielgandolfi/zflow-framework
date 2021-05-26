const threads = require("worker_threads");

console.log('engine-test.js begin');

function wait() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, 1000);
  });
}

threads.parentPort.postMessage({ info: 'BEFORE INSERT' });

wait().then(() => threads.parentPort.postMessage({ info: 'AFTER WAIT' }));

console.log('engine-test.js end');
