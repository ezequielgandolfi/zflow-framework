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

export enum ListenerEvent {
  COMPONENT_COMPLETED = 'component_completed',
  STREAM_COMPLETED = "stream_completed"
}

export interface IFlow {
  getFlow(): Array<Component.Any>;
  setFlow(flow: Array<Component.Any>);
  getNext(from: string, output: string): Array<Component.Execution>;
  execute(component: Component.Instance);
  resume(component: Component.Instance);

  storeComponent(id: string, component: Component.Instance);
  getStoredComponent(id: string): Component.Instance;
  freeComponent(id: string);
  freeChildComponents(id: string, output?: string);

  updateListeners(options?:IUpdateListenersOptions);
  listenStreamCompleted(from: string, output: string): events.EventEmitter;
  unlistenStreamCompleted(from: string, output: string);
  listenComponentCompleted(sourceId: string): events.EventEmitter;
  unlistenComponentCompleted(sourceId: string);
}

export interface IFunctions {
  transformProperties(props: any): any;
}

export interface IStorage {
  set(id: string, value: any);
  get(id: string): any;
}

export interface IEngine {
  database: IDatabase;
  flow: IFlow;
  functions: IFunctions;
  storage: IStorage;
}
