import * as events from 'events';
import * as ZFlowComponents from '@zflow/components';
import * as ZFlowTypes from '@zflow/types';
import { ZFlowScript } from '@zflow/script';

class ArrayUtils {
  static removeDuplicates(array) {
    return array.filter((item, i) => array.indexOf(item) === i);
  }
}

class DatabaseEngine implements ZFlowTypes.Engine.Database {
  private _engine: ZFlowTypes.Engine.Engine;

  constructor(engine: ZFlowTypes.Engine.Engine) {
    this._engine = engine;
  }
}

class FlowEngine implements ZFlowTypes.Engine.Flow {
  private _engine: ZFlowTypes.Engine.Engine;
  private _flow: Array<ZFlowTypes.Component.AnyComponent>;
  private _storedComponents: Array<ZFlowTypes.Component.Instance> = [];
  private _listeners = [];

  sessionStorage: ZFlowTypes.Engine.Storage;

  constructor(engine: ZFlowTypes.Engine.Engine) {
    this._engine = engine;
    this.sessionStorage = new StorageEngine(this._engine);
  }

  //#region Internal function
  private _hasPendingExec = (id: string, output: string) => {
    const next = this.getNext(id, output);
    return !!next.find(n => {
      const component = this.getStoredComponent(n.id);
      if (component) {
        if (component.$status !== 'finished') {
          return true;
        }
        else {
          const outputs = ArrayUtils.removeDuplicates(this._flow
            .filter((item:ZFlowTypes.Component.Output) => item.source === n.id)
            .map((item:ZFlowTypes.Component.Output) => item.sourceHandle));
          if (outputs.length === 0) {
            return false;
          }
          const choosenPath = outputs.find(o => {
            const choosenNext = this.getNext(n.id, o);
            return !!choosenNext.find(cn => !!this._storedComponents[cn.id]); 
          });
          if (choosenPath) {
            return this._hasPendingExec(n.id, choosenPath);
          }
          else {
            return true;
          }
        }
      }
      return true;
    });
  };

  private _onExecutionComplete(component: ZFlowTypes.Component.Instance) {
    this.updateListeners({ completedComponentId: component.$data.id });
  }
  //#endregion

  //#region Flow
  getFlow(): Array<ZFlowTypes.Component.AnyComponent> {
    return this._flow;
  }
  setFlow(flow: Array<ZFlowTypes.Component.AnyComponent>) {
    this._flow = flow;
  }

  getNext(from: string, output: string): Array<ZFlowTypes.Component.Execution> {
    return this._flow
      .filter((item:ZFlowTypes.Component.Output) => (item.source === from) && (item.sourceHandle === output))
      .map((o:ZFlowTypes.Component.Output) => <ZFlowTypes.Component.Execution>this._flow.find((item:ZFlowTypes.Component.Execution) => item.id === o.target));
  }

  execute(component: ZFlowTypes.Component.Instance) {
    component.$event.once('complete', () => { this._onExecutionComplete(component) });
    process.nextTick(() => component.execute());
  }

  resume(component: ZFlowTypes.Component.Instance) {
    component.$event.once('complete', () => { this._onExecutionComplete(component) });
    process.nextTick(() => component.resume());
  }
  //#endregion

  //#region Stored components
  storeComponent(id: string, component: ZFlowTypes.Component.Instance) {
    this._storedComponents[id] = component;
  }

  getStoredComponent(id: string): ZFlowTypes.Component.Instance {
    return this._storedComponents[id];
  }

  freeComponent(id: string) {
    const component: ZFlowTypes.Component.Instance = this._storedComponents[id];
    if (component?.$status === 'finished') {
      component.$event.removeAll();
      delete this._storedComponents[id];
      const next = this._flow.filter((item:ZFlowTypes.Component.Output) => item.source === id);
      next.forEach((item:ZFlowTypes.Component.Output) => this.freeComponent(item.target));
    }
  }

  freeChildComponents(id: string, output?: string) {
    let components = this._flow.filter((item:ZFlowTypes.Component.Output) => item.source === id);
    if (output) {
      components = components.filter((item:ZFlowTypes.Component.Output) => item.sourceHandle === output);
    }
    components.forEach((item:ZFlowTypes.Component.Output) => this.freeComponent(item.target));
  }
  //#endregion

  //#region Listeners
  updateListeners(options?: ZFlowTypes.Engine.UpdateListenersOptions) {
    // COMPONENT COMPLETED
    const componentCompletedEvent: ZFlowTypes.Engine.ListenerEventType = 'component_completed';
    if (options?.completedComponentId) {
      const componentListeners = this._listeners.filter(w => w.type === componentCompletedEvent);
      componentListeners.forEach(w => {
        process.nextTick(() => w.event.emit(componentCompletedEvent, { id: w.sourceId }));
      })
    }
    // STREAM COMPLETED
    const streamCompletedEvent: ZFlowTypes.Engine.ListenerEventType = 'stream_completed';
    const streamListeners = this._listeners.filter(w => w.type === streamCompletedEvent).filter(w => !this._hasPendingExec(w.from, w.output));
    streamListeners.forEach(w => {
      this.unlistenStreamCompleted(w.from, w.output);
      process.nextTick(() => w.event.emit(streamCompletedEvent, { from: w.from, output: w.output }));
    });
  }

  listenStreamCompleted(from: string, output: string) {
    const streamCompletedEvent: ZFlowTypes.Engine.ListenerEventType = 'stream_completed';
    const listener = { type: streamCompletedEvent, from, output, event: new events.EventEmitter() };
    this._listeners.push(listener);
    return listener.event;
  }

  unlistenStreamCompleted(from: string, output: string) {
    const streamCompletedEvent: ZFlowTypes.Engine.ListenerEventType = 'stream_completed';
    let index: number;
    do {
      index = this._listeners.findIndex(item => (item.type === streamCompletedEvent) && (item.from === from) && (item.output === output));  
      if (index >= 0) {
        this._listeners.splice(index, 1);
      }
    } while (index < 0);
  }

  listenComponentCompleted(sourceId: string): events.EventEmitter {
    const componentCompletedEvent: ZFlowTypes.Engine.ListenerEventType = 'component_completed';
    const listener = { type: componentCompletedEvent, sourceId, event: new events.EventEmitter() };
    this._listeners.push(listener);
    return listener.event;
  };

  unlistenComponentCompleted(sourceId: string) {
    const componentCompletedEvent: ZFlowTypes.Engine.ListenerEventType = 'component_completed';
    let index: number;
    do {
      index = this._listeners.findIndex(item => (item.type === componentCompletedEvent) && (item.sourceId === sourceId));  
      if (index >= 0) {
        this._listeners.splice(index, 1);
      }
    } while (index < 0);
  };
  //#endregion
}

class FunctionsEngine implements ZFlowTypes.Engine.Functions {
  private _engine: ZFlowTypes.Engine.Engine;
  private _zflowScript: ZFlowScript;

  constructor(engine: ZFlowTypes.Engine.Engine) {
    this._engine = engine;
    this._zflowScript = new ZFlowScript(this._engine);
  }

  transformProperties(props: any): any {
    const result = { };
    Object.keys(props).forEach(k => {
      try {
        let value = props[k];
        if (typeof(value) === 'string') {
          result[k] = this._zflowScript.parse(value);
        }
        else {
          result[k] = value;
        }
      }
      catch { }
    });
    return result;
  }
}

class StorageEngine implements ZFlowTypes.Engine.Storage {

  private _engine: ZFlowTypes.Engine.Engine;
  private _variables = {  };

  constructor(engine: ZFlowTypes.Engine.Engine) {
    this._engine = engine;
  }

  get(id: string): any {
    return this._variables[id];
  }

  set(id: string, value: any) {
    this._variables[id] = value;
  }
}


export class FlowEngineCore implements ZFlowTypes.Engine.Engine {

  database = new DatabaseEngine(this);
  flow = new FlowEngine(this);
  functions = new FunctionsEngine(this);
  storage = new StorageEngine(this);

}
