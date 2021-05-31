const express = require("express");
const logger = require("../logger");
const engines = require("../engines");

class Worker {
  description = 'Generic Worker';
  config;
  exec;

  constructor (config, exec) {
    this.config = config;
    this.exec = exec;
  }

  init() { }
  start() { }
  stop() { }
  end() { }
}


class WebWorker extends Worker {
  description = 'WebWorker';

  _express;
  _server;
  _engine;

  init() {
    this._engine = new engines.FlowEngine();
    this._express = express();
    this.setupFlowEndpoints();
  }

  start() {
    this._server = this._express.listen(this.config.port, () => {
      logger.info(`${this.description} listening on ${this.config.port}`);
    });
  }

  stop() {
    if (this._server) {
      this._server.close();
    }
  }

  end() {
    if (this._express) {
      this._express.removeAllListeners();
    }
  }

  setupFlowEndpoints() {
    this.exec.filter(exec => exec.type === "flow").forEach(exec => {
      this._engine.addFlow(exec);
      this._express.get(exec.config.path, (req, res) => {
        let data = '';
        // build body data
        req.on('data', (chunk) => {
            data += chunk;
        });
        // end request
        req.on('end', () => {
          this.onData(res,exec.id,req.params,req.query,data);
        });
      });
    });
  }

  onData(response,id,path,query,payload) {
    const data = {
      queryParam: query,
      pathParam: path,
      payload: payload
    };
    this._engine.execute(id, data)
      .then(result => response.json(result))
      .catch(error => {
        logger.error(error);
        response.json({ ok: false });
      });
    // console.log('path', path);
    // console.log('query', query);
    // console.log('payload', payload);
    // response.json({ ok: true });
  }
}


module.exports = {
  web: WebWorker
}