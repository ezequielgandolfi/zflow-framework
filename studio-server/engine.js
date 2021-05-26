const path = require("path");
const threads = require("worker_threads");
// const uuidv4 = require("uuid").v4;


class ZFlowEngine {
  ENGINE_STATUS = {
    RUNNING: 0,
    OK: 1,
    ERROR: -1
  }

  ENGINE_WORKER = path.join(__dirname, "engine-test.js");

  start() {
    
  }

  test() {
    console.log("Starting engine test...");
    global.connection.dbRunHistory
      .insertOne({ status: null, startDate: null, endDate: null })
      .then(insert => {
        const _id = insert.insertedId;
        console.log(`Creating worker for ${_id}...`);
        const worker = new threads.Worker(this.ENGINE_WORKER, { });
        worker.on("online", () => {
          console.log(">ONLINE");
          global.connection.dbRunHistory
            .updateOne({ _id }, { $currentDate: { startDate: true }, $set: { status: this.ENGINE_STATUS.RUNNING } });
        });
        worker.on("error", err => {
          console.log(">ERROR");
          // global.connection.dbRunHistory
          //   .updateOne({ _id }, { $currentDate: { endDate: true }, $set: { status: this.ENGINE_STATUS.ERROR } });
        });
        worker.on("exit", exitCode => {
          console.log(">EXIT:", exitCode);
          global.connection.dbRunHistory
            .updateOne({ _id /*, status: this.ENGINE_STATUS.RUNNING*/ }, { $currentDate: { endDate: true }, $set: { status: (exitCode === 0 ? this.ENGINE_STATUS.OK : this.ENGINE_STATUS.ERROR) } });
        });
        worker.on("message", value => console.log(">MESSAGE:", value));
        worker.on("messageerror", args => console.log(">MSGERROR:", args));

        console.log("Worker created");
      });
  }

}

module.exports = { ZFlowEngine }

