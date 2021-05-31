const events = require("events");
const CONSTS = require("./consts");

class BaseComponent {

  $data;
  $engine;

  change = new events.EventEmitter();
  status = CONSTS.COMPONENT_STATUS.PRISTINE;

  setup(engine, data) {
    this.$engine = engine;
    this.$data = data;
  }
  inject(props) {
    Object.assign(this, props);
    this.fix();
  }
  fix() {
  }

  execute() {
    this.status = CONSTS.COMPONENT_STATUS.RUNNING;
  }
  suspend() {
    this.status = CONSTS.COMPONENT_STATUS.WAITING;
  }
  resume() {
    this.status = CONSTS.COMPONENT_STATUS.RUNNING;
  }
  finish() {
    this.status = CONSTS.COMPONENT_STATUS.FINISHED;
  }

  dispatch(type,data) {
    return this.change.emit("status", { type, data });
  }

}

class Ok extends BaseComponent {
  ok() {
    this.finish();
    this.dispatch("ok");
  }
}

class OkError extends Ok {
  error() {
    this.finish();
    this.dispatch("error");
  }
}

class Repeat extends BaseComponent {
  repeat() {
    this.suspend();
    this.dispatch("repeat");
  }
  end() {
    this.finish();
    this.dispatch("end");
  }
}


module.exports = {
  Ok,
  OkError,
  Repeat
}