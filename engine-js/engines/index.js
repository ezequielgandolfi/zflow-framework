const threads = require("worker_threads");
const path = require("path");

// const
class FlowEngine {
  _engineThread = path.join(__dirname, "flow-engine.js");

  flows = {};

  constructor() {
  }

  addFlow(flowData) {
    this.flows[flowData.id] = flowData.data;
  }

  execute(id,data) {
    const flow = this.flows[id];
    if (flow) {
      this.startThread(flow, data);
      return Promise.resolve({ ok: true });
    }
    else {
      return Promise.reject(null);
    }
  }

  startThread(flow,initData) {
    const worker = new threads.Worker(this._engineThread, { workerData: { flow, initData } });
    worker.on("online", () => {
      console.log(">ONLINE");
    });
    worker.on("error", err => {
      console.log(">ERROR", err);
    });
    worker.on("exit", exitCode => {
      console.log(">EXIT:", exitCode);
    });
    worker.on("message", value => console.log(">MESSAGE:", value));
    worker.on("messageerror", args => console.log(">MSGERROR:", args));
  }
}


module.exports = {
  FlowEngine
}