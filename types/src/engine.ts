import * as events from "events";
import * as Component from "./component";

export interface IUpdateListenersOptions {
  /**
   * Sinal watchers for component execution complete
   */
  completedComponentId?: string;
}

export interface IDatabase {
}

export interface IFlow {
  getFlow(): Array<Component.Any>;
  setFlow(flow: Array<Component.Any>);
  getNext(from: string, output: string): Array<Component.Execution>;
  execute(component: Component.Instance);

  storeComponent(id: string, component: Component.Instance);
  getStoredComponent(id: string): Component.Instance;
  freeComponent(id: string);
  freeChildComponents(id: string);

  updateListeners(options?:IUpdateListenersOptions);
  listenStreamCompleted(from: string, output: string): events.EventEmitter;
  unlistenStreamCompleted(from: string, output: string);
  listenComponentCompleted(sourceId: string): events.EventEmitter;
  unlistenComponentCompleted(sourceId: string);
}

export interface IEngine {
  database: IDatabase;
  flow: IFlow;
}
