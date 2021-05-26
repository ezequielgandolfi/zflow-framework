const events = require("events");
// const { COMPONENT_STATUS } = require("./consts");

class BaseComponent {

  $engineProps;

  change = new events.EventEmitter();
  // status = COMPONENT_STATUS.PRISTINE;
  
  setup(engineProps) {
    this.$engineProps = engineProps;
  }
  inject(props) {
    Object.assign(this, props);
  }
  execute() {
    throw new Error("ABSTRACT call");
  }

  dispatch(type,data) {
    return this.change.emit("status", { type, data });
  }

}

class Ok extends BaseComponent {
  ok() {
    this.dispatch("ok");
  }
}

class OkError extends Ok {
  error() {
    this.dispatch("error");
  }
}


module.exports = {
  Ok,
  OkError
}