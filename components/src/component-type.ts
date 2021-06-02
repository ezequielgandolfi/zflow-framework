import * as ZFlowTypes from "@zflow/types";
import EventEmitter from "events";

export class Abstract implements ZFlowTypes.Component.Instance {
  
  private _data: ZFlowTypes.Component.Execution;
  private _engine: ZFlowTypes.Engine.IEngine;  
  $status = ZFlowTypes.Const.COMPONENT.STATUS.PRISTINE;

  protected change = new EventEmitter();
  
  get $data() { return this._data };
  get $engine() { return this._engine };

  setup(engine: ZFlowTypes.Engine.IEngine, data: ZFlowTypes.Component.Execution) {
    this._engine = engine;
    this._data = data;
  }

  inject(props) {
    if ((props) && (props instanceof Object)) {
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
  }

  execute() {
    this.$status = ZFlowTypes.Const.COMPONENT.STATUS.RUNNING;
  }
  suspend() {
    this.$status = ZFlowTypes.Const.COMPONENT.STATUS.WAITING;
  }
  resume() {
    this.$status = ZFlowTypes.Const.COMPONENT.STATUS.RUNNING;
  }
  finish() {
    this.$status = ZFlowTypes.Const.COMPONENT.STATUS.FINISHED;
  }

  on(event: ZFlowTypes.Component.ComponentEvents, callback: (...args: any[]) => void) {
    return this.change.on(event, callback);
  }

  once(event: ZFlowTypes.Component.ComponentEvents, callback: (...args: any[]) => void) {
    return this.change.once(event, callback);
  }

  dispatch(event: ZFlowTypes.Component.ComponentEvents, data?: any) {
    return this.change.emit(event, data);
  }

  protected signalOutput(output: string) {
    return this.dispatch("complete", { type: output });
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

