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
  private hasPendingExec = (id, output) => {
    const next = this.getNext(id, output);
    return !!next.find(n => {
      const component = this.getStoredComponent(n.id);
      if (component) {
        if (component.$status !== ZFlowTypes.Const.COMPONENT.STATUS.FINISHED) {
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
    component.once("complete", () => { this.onExecutionComplete(component) });
    process.nextTick(() => component.execute());
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
    const component = this.storedComponents[id];
    if (component) {
      component.change.removeAllListeners();
      const next = this.flow.filter((item:ZFlowTypes.Component.Output) => item.source === id);
      next.forEach((item:ZFlowTypes.Component.Output) => this.freeComponent(item.target));
    }
  }

  freeChildComponents(id: string) {
    this.flow
      .filter((item:ZFlowTypes.Component.Output) => item.source === id)
      .forEach((item:ZFlowTypes.Component.Output) => this.freeComponent(item.target));
  }
  //#endregion

  //#region Watchers
  updateListeners(options?: ZFlowTypes.Engine.IUpdateListenersOptions) {
    // COMPONENT COMPLETED
    if (options?.completedComponentId) {
      const componentListeners = this.listeners.filter(w => w.type === ZFlowTypes.Const.FLOW.LISTENER).filter(w => w.sourceId === options.completedComponentId);
      componentListeners.forEach(w => {
        process.nextTick(() => w.event.emit(ZFlowTypes.Const.FLOW.LISTENER.COMPONENT_COMPLETED, { id: w.sourceId }));
      })
    }
    // STREAM COMPLETED
    const streamListeners = this.listeners.filter(w => w.type === ZFlowTypes.Const.FLOW.LISTENER.STREAM_COMPLETED).filter(w => !this.hasPendingExec(w.from, w.output));
    streamListeners.forEach(w => {
      this.unlistenStreamCompleted(w.from, w.output);
      process.nextTick(() => w.event.emit(ZFlowTypes.Const.FLOW.LISTENER.STREAM_COMPLETED, { from: w.from, output: w.output }));
    });
  }

  listenStreamCompleted(from, output) {
    const listener = { type: ZFlowTypes.Const.FLOW.LISTENER.STREAM_COMPLETED, from, output, event: new events.EventEmitter() };
    this.listeners.push(listener);
    return listener.event;
  }

  unlistenStreamCompleted(from, output) {
    let index;
    do {
      index = this.listeners.findIndex(item => (item.type === ZFlowTypes.Const.FLOW.LISTENER.STREAM_COMPLETED) && (item.from === from) && (item.output === output));  
      if (index >= 0) {
        this.listeners.splice(index, 1);
      }
    } while (index < 0);
  }

  listenComponentCompleted(sourceId: string): events.EventEmitter {
    const listener = { type: ZFlowTypes.Const.FLOW.LISTENER.COMPONENT_COMPLETED, sourceId, event: new events.EventEmitter() };
    this.listeners.push(listener);
    return listener.event;
  };

  unlistenComponentCompleted(sourceId: string) {
    let index;
    do {
      index = this.listeners.findIndex(item => (item.type === ZFlowTypes.Const.FLOW.LISTENER.COMPONENT_COMPLETED) && (item.sourceId === sourceId));  
      if (index >= 0) {
        this.listeners.splice(index, 1);
      }
    } while (index < 0);
  };
  //#endregion
}


export class EngineFunctions implements ZFlowTypes.Engine.IEngine {

  database = new DatabaseFunctions();
  flow = new FlowFunctions();

}
