import * as ZFlowTypes from "@zflow/types";
import EventEmitter from "events";

type ComponentEvents = "status" | "again";

export class Abstract {
  
  status = ZFlowTypes.Const.COMPONENT.STATUS.PRISTINE;

  protected change = new EventEmitter();
  protected $data: any;
  protected $engine: ZFlowTypes.Engine.IEngine;

  setup(engine: ZFlowTypes.Engine.IEngine, data: any) {
    this.$engine = engine;
    this.$data = data;
  }

  inject(props) {
    Object.keys(props).forEach(name => {
      const objProp = this[name];
      if (objProp && ZFlowTypes.DataType.isZFlowDataType(objProp)) {
        let propValue = props[name];
        if (ZFlowTypes.DataType.isZFlowDataType(propValue)) {
          propValue = propValue.get();
        }
        objProp.set(propValue);
      }
    });
  }

  execute() {
    this.status = ZFlowTypes.Const.COMPONENT.STATUS.RUNNING;
  }
  suspend() {
    this.status = ZFlowTypes.Const.COMPONENT.STATUS.WAITING;
  }
  resume() {
    this.status = ZFlowTypes.Const.COMPONENT.STATUS.RUNNING;
  }
  finish() {
    this.status = ZFlowTypes.Const.COMPONENT.STATUS.FINISHED;
  }

  on(event: ComponentEvents, callback: (...args: any[]) => void) {
    return this.change.on(event, callback);
  }

  dispatch(event: ComponentEvents, data?: any) {
    return this.change.emit(event, data);
  }

  protected signalOutput(output: string) {
    return this.dispatch("status", { type: output });
  }

}

export class Ok extends Abstract {
  ok() {
    this.finish();
    this.signalOutput("ok");
  }
}

export class OkError extends Ok {
  error() {
    this.finish();
    this.signalOutput("error");
  }
}

export class Repeat extends Abstract {
  repeat() {
    this.suspend();
    this.signalOutput("repeat");
  }
  end() {
    this.finish();
    this.signalOutput("end");
  }
}

export class Condition extends Abstract {
  true() {
    this.suspend();
    this.signalOutput("true");
  }
  false() {
    this.finish();
    this.signalOutput("false");
  }
}

