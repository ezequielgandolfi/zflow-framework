import { EventEmitter } from "events";
import { IEngine } from "./engine";

interface ComponentData {
  component: string;
  properties: any;
  id?: string;
  label?: string;
}

interface ComponentPosition {
  x: number;
  y: number;
}

/**
 * Interface for component data
 * This is how the component will be stored in flow diagram configuration
 */
export interface Execution {
  id: string;
  type: string;
  data: ComponentData;
  position: ComponentPosition;
}

/**
 * Interface for component output handles
 * This is how the handles will be stored in flow diagram configuration
 */
export interface Output {
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
}

/**
 * Accepts component data or output handles
 */
export type Any = Execution | Output;

/**
 * Interface for component instance
 * This is the basic interface for the component execution instance running on ZFlow Engine
 */
export interface Instance {
  
  status: string;

  setup(engine: IEngine, data: Execution);
  inject(props: any);

  execute();
  suspend();
  resume();
  finish();

  on(event: string, callback: (...args: any[]) => void);
  dispatch(event: string, data?: any);

}