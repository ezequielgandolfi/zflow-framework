import * as ZFlowTypes from "@zflow/types";
import EventEmitter from "events";
import { AbstractProperty } from "./property";

export class Abstract extends ZFlowTypes.Component.Instance {

  static key = "";
  static description = "";
  static shortDescription = "";
  static icon = "";
  static properties: AbstractProperty[] = [];
  static inputPort: ZFlowTypes.Component.ComponentInputPort = "single";
  static outputPorts: Array<ZFlowTypes.Component.ComponentOutputPort> = [];
  
  private _data: ZFlowTypes.Component.Execution;
  private _engine: ZFlowTypes.Engine.Engine;  
  protected _change = new EventEmitter();

  get $data() { return this._data }; 
  get $engine() { return this._engine };

  $status: ZFlowTypes.Component.ComponentStatus = 'pristine';

  $event: ZFlowTypes.Component.ComponentEvent = {
    on: this._on.bind(this),
    once: this._once.bind(this),
    dispatch: this._dispatch.bind(this),
    removeAll: this._removeAllListeners.bind(this)
  };

  $input: ZFlowTypes.Component.ComponentInput = {
    inject: this._inject.bind(this)
  };

  $output: ZFlowTypes.Component.ComponentOutput = {
  };

  protected _inject(props) {
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

  protected _on(event: ZFlowTypes.Component.ComponentEventType, callback: (...args: any[]) => void) {
    return this._change.on(event, callback);
  }

  protected _once(event: ZFlowTypes.Component.ComponentEventType, callback: (...args: any[]) => void) {
    return this._change.once(event, callback);
  }

  protected _dispatch(event: ZFlowTypes.Component.ComponentEventType, data?: any) {
    return this._change.emit(event, data);
  }

  protected _removeAllListeners() {
    this._change.removeAllListeners();
  }

  protected _signalOutput(output: ZFlowTypes.Component.ComponentOutputPort) {
    return this._dispatch("complete", { type: output });
  }

  setup(engine: ZFlowTypes.Engine.Engine, data: ZFlowTypes.Component.Execution) {
    this._engine = engine;
    this._data = data;
  }

  execute() {
    this.$status = 'running';
  }
  suspend() {
    this.$status = 'waiting';
  }
  resume() {
    this.$status = 'running';
  }
  finish() {
    this.$status = 'finished';
  }

}

export class Ok extends Abstract {
  static outputPorts: Array<ZFlowTypes.Component.ComponentOutputPort> = ["ok"];
  $output: ZFlowTypes.Component.ComponentOutput = {
    ok: this.ok.bind(this)
  };

  protected ok() {
    this.finish();
    this._signalOutput("ok");
  }
}

export class Start extends Ok {
  static inputPort: ZFlowTypes.Component.ComponentInputPort = "none";
}

export class Stop extends Abstract {
  $output: ZFlowTypes.Component.ComponentOutput = {
    error: this.error.bind(this)
  };

  protected error() {
    this.finish();
    this._signalOutput("error");
  }
}

export class OkError extends Ok {
  static outputPorts: Array<ZFlowTypes.Component.ComponentOutputPort> = ["ok", "error"];
  $output: ZFlowTypes.Component.ComponentOutput = {
    ok: this.ok.bind(this),
    error: this.error.bind(this)
  };

  protected error() {
    this.finish();
    this._signalOutput("error");
  }
}

export class Repeat extends Abstract {
  static outputPorts: Array<ZFlowTypes.Component.ComponentOutputPort> = ["repeat", "end"];
  $output: ZFlowTypes.Component.ComponentOutput = {
    repeat: this.repeat.bind(this),
    end: this.end.bind(this)
  };

  protected repeat() {
    this.suspend();
    this._signalOutput("repeat");
  }
  protected end() {
    this.finish();
    this._signalOutput("end");
  }
}

export class Condition extends Abstract {
  static outputPorts: Array<ZFlowTypes.Component.ComponentOutputPort> = ["true","false"];
  $output: ZFlowTypes.Component.ComponentOutput = {
    true: this.true.bind(this),
    false: this.false.bind(this)
  };

  protected true() {
    this.suspend();
    this._signalOutput("true");
  }
  protected false() {
    this.finish();
    this._signalOutput("false");
  }
}

export class Join extends Abstract {
  static inputPort: ZFlowTypes.Component.ComponentInputPort = "multiple";

  static outputPorts: Array<ZFlowTypes.Component.ComponentOutputPort> = ["ok"];
  $output: ZFlowTypes.Component.ComponentOutput = {
    ok: this.ok.bind(this)
  };

  protected ok() {
    this.finish();
    this._signalOutput("ok");
  }
}
