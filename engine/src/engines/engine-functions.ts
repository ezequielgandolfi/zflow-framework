import * as events from "events";
import * as ZFlowComponents from "@zflow/components";
import * as ZFlowTypes from "@zflow/types";

class ArrayUtils {
  static removeDuplicates(array) {
    return array.filter((item, i) => array.indexOf(item) === i);
  }
}

class DatabaseFunctions implements ZFlowTypes.Engine.IDatabase {
}

class FlowFunctions implements ZFlowTypes.Engine.IFlow {
  private flow: Array<ZFlowTypes.Component.Any>;
  private storedComponents: Array<ZFlowTypes.Component.Instance> = [];
  private listeners = [];

  //#region Internal function
  private hasPendingExec = (id: string, output: string) => {
    const next = this.getNext(id, output);
    return !!next.find(n => {
      const component = this.getStoredComponent(n.id);
      if (component) {
        if (component.$status !== ZFlowTypes.Component.ComponentStatus.FINISHED) {
          return true;
        }
        else {
          const outputs = ArrayUtils.removeDuplicates(this.flow
            .filter((item:ZFlowTypes.Component.Output) => item.source === n.id)
            .map((item:ZFlowTypes.Component.Output) => item.sourceHandle));
          if (outputs.length === 0) {
            return false;
          }
          const choosenPath = outputs.find(o => {
            const choosenNext = this.getNext(n.id, o);
            return !!choosenNext.find(cn => !!this.storedComponents[cn.id]); 
          });
          if (choosenPath) {
            return this.hasPendingExec(n.id, choosenPath);
          }
          else {
            return true;
          }
        }
      }
      return true;
    });
  };
  //#endregion

  //#region Flow
  getFlow(): Array<ZFlowTypes.Component.Any> {
    return this.flow;
  }
  setFlow(flow: Array<ZFlowTypes.Component.Any>) {
    this.flow = flow;
  }

  getNext(from: string, output: string): Array<ZFlowTypes.Component.Execution> {
    return this.flow
      .filter((item:ZFlowTypes.Component.Output) => (item.source === from) && (item.sourceHandle === output))
      .map((o:ZFlowTypes.Component.Output) => <ZFlowTypes.Component.Execution>this.flow.find((item:ZFlowTypes.Component.Execution) => item.id === o.target));
  }

  execute(component: ZFlowTypes.Component.Instance) {
    component.$event.once("complete", () => { this.onExecutionComplete(component) });
    process.nextTick(() => component.execute());
  }

  resume(component: ZFlowTypes.Component.Instance) {
    component.$event.once("complete", () => { this.onExecutionComplete(component) });
    process.nextTick(() => component.resume());
  }

  private onExecutionComplete(component: ZFlowTypes.Component.Instance) {
    this.updateListeners({ completedComponentId: component.$data.id });
  }
  //#endregion

  //#region Stored components
  storeComponent(id: string, component: ZFlowTypes.Component.Instance) {
    this.storedComponents[id] = component;
  }

  getStoredComponent(id: string): ZFlowTypes.Component.Instance {
    return this.storedComponents[id];
  }

  freeComponent(id: string) {
    const component: ZFlowTypes.Component.Instance = this.storedComponents[id];
    if (component?.$status === ZFlowTypes.Component.ComponentStatus.FINISHED) {
      component.$event.removeAll();
      delete this.storedComponents[id];
      const next = this.flow.filter((item:ZFlowTypes.Component.Output) => item.source === id);
      next.forEach((item:ZFlowTypes.Component.Output) => this.freeComponent(item.target));
    }
  }

  freeChildComponents(id: string, output?: string) {
    let components = this.flow.filter((item:ZFlowTypes.Component.Output) => item.source === id);
    if (output) {
      components = components.filter((item:ZFlowTypes.Component.Output) => item.sourceHandle === output);
    }
    components.forEach((item:ZFlowTypes.Component.Output) => this.freeComponent(item.target));
  }
  //#endregion

  //#region Listeners
  updateListeners(options?: ZFlowTypes.Engine.IUpdateListenersOptions) {
    // COMPONENT COMPLETED
    if (options?.completedComponentId) {
      const componentListeners = this.listeners.filter(w => w.type === ZFlowTypes.Engine.ListenerEvent.COMPONENT_COMPLETED);
      componentListeners.forEach(w => {
        process.nextTick(() => w.event.emit(ZFlowTypes.Engine.ListenerEvent.COMPONENT_COMPLETED, { id: w.sourceId }));
      })
    }
    // STREAM COMPLETED
    const streamListeners = this.listeners.filter(w => w.type === ZFlowTypes.Engine.ListenerEvent.STREAM_COMPLETED).filter(w => !this.hasPendingExec(w.from, w.output));
    // if (options?.completedComponentId == "3dd78101-4b91-4bfb-a103-320731835cd5") console.log('Z', streamListeners);
    streamListeners.forEach(w => {
      this.unlistenStreamCompleted(w.from, w.output);
      process.nextTick(() => w.event.emit(ZFlowTypes.Engine.ListenerEvent.STREAM_COMPLETED, { from: w.from, output: w.output }));
    });
  }

  listenStreamCompleted(from: string, output: string) {
    const listener = { type: ZFlowTypes.Engine.ListenerEvent.STREAM_COMPLETED, from, output, event: new events.EventEmitter() };
    this.listeners.push(listener);
    return listener.event;
  }

  unlistenStreamCompleted(from: string, output: string) {
    let index: number;
    do {
      index = this.listeners.findIndex(item => (item.type === ZFlowTypes.Engine.ListenerEvent.STREAM_COMPLETED) && (item.from === from) && (item.output === output));  
      if (index >= 0) {
        this.listeners.splice(index, 1);
      }
    } while (index < 0);
  }

  listenComponentCompleted(sourceId: string): events.EventEmitter {
    const listener = { type: ZFlowTypes.Engine.ListenerEvent.COMPONENT_COMPLETED, sourceId, event: new events.EventEmitter() };
    this.listeners.push(listener);
    return listener.event;
  };

  unlistenComponentCompleted(sourceId: string) {
    let index: number;
    do {
      index = this.listeners.findIndex(item => (item.type === ZFlowTypes.Engine.ListenerEvent.COMPONENT_COMPLETED) && (item.sourceId === sourceId));  
      if (index >= 0) {
        this.listeners.splice(index, 1);
      }
    } while (index < 0);
  };
  //#endregion
}

class StorageFunctions implements ZFlowTypes.Engine.IStorage {

  private variables = {  };

  get(id: string): any {
    return this.variables[id];
  }

  set(id: string, value: any) {
    this.variables[id] = value;
  }
}


export class EngineFunctions implements ZFlowTypes.Engine.IEngine {

  database = new DatabaseFunctions();
  flow = new FlowFunctions();
  storage = new StorageFunctions();

}
