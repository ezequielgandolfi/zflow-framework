import * as events from "events";
import * as Component from "./component";

export interface IDatabase {
}

export interface IFlow {
  setFlow(flow: Array<Component.Any>);
  getNext(from: string, output: string): Array<Component.Execution>;

  storeComponent(id: string, component: any);
  getStoredComponent(id: string): any;
  freeComponent(id: string);
  freeChildComponents(id: string);

  updateWatchers();
  watchStreamEnd(from: string, output: string): events.EventEmitter;
  removeStreamEndWatcher(from: string, output: string);
}

export interface IEngine {
  database: IDatabase;
  flow: IFlow;
}
