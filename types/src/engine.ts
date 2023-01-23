import * as events from 'events';
import * as Component from './component';

export interface UpdateListenersOptions {
  /**
   * Sinal watchers for component execution complete
   */
  completedComponentId?: string;
}

export interface Database {
}

export type ListenerEventType = 'component_completed' | 'stream_completed';

export interface Flow {
  sessionStorage: Storage;

  getFlow(): Array<Component.AnyComponent>;
  setFlow(flow: Array<Component.AnyComponent>);
  getNext(from: string, output: string): Array<Component.Execution>;
  execute(component: Component.Instance);
  resume(component: Component.Instance);

  storeComponent(id: string, component: Component.Instance);
  getStoredComponent(id: string): Component.Instance;
  freeComponent(id: string);
  freeChildComponents(id: string, output?: string);

  updateListeners(options?: UpdateListenersOptions);
  listenStreamCompleted(from: string, output: string): events.EventEmitter;
  unlistenStreamCompleted(from: string, output: string);
  listenComponentCompleted(sourceId: string): events.EventEmitter;
  unlistenComponentCompleted(sourceId: string);
}

export interface Functions {
  transformProperties(props: any): any;
}

export interface Storage {
  set(id: string, value: any);
  get(id: string): any;
}

export interface Engine {
  database: Database;
  flow: Flow;
  functions: Functions;
  storage: Storage;
}
