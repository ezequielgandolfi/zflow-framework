import express from 'express';
import * as Engines from '../engines';
import * as Logger from '../logger';

class GenericWorker {
  description = 'Generic Worker';
  config;
  exec: any[];

  constructor (config, exec) {
    this.config = config;
    this.exec = exec;
  }

  init() { }
  start() { }
  stop() { }
  end() { }
}


class WebWorker extends GenericWorker {
  description = 'WebWorker';

  _express;
  _server;
  _engine;

  init() {
    this._engine = new Engines.FlowEngine();
    this._express = express();
    this.setupFlowEndpoints();
  }

  start() {
    this._server = this._express.listen(this.config.port, () => {
      Logger.info(`${this.description} listening on ${this.config.port}`);
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
    this.exec.filter(exec => exec.type === 'flow').forEach(exec => {
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
        Logger.error(error);
        response.json({ ok: false });
      });
  }
}

export const Type = {
  web: WebWorker
}