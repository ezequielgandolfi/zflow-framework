import { EventEmitter } from 'events';
import { Engine } from './engine';

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
export type AnyComponent = Execution | Output;

export type ComponentEventType = 'complete' | 'resume';

export interface ComponentEvent {
  on(event: ComponentEventType, callback: (...args: any[]) => void): EventEmitter;
  once(event: ComponentEventType, callback: (...args: any[]) => void): EventEmitter;
  dispatch(event: ComponentEventType, data?: any): boolean;
  removeAll();
}

export type ComponentInputPort = 'none' | 'single' | 'multiple' | never;

export type ComponentOutputPort = 'ok' | 'error' | 'repeat' | 'end' | 'true' | 'false' | never;

export interface ComponentInput {
  inject: (props: any) => void;
}

export interface ComponentOutput {
  ok?: () => void;
  error?: () => void;
  repeat?: () => void;
  end?: () => void;
  true?: () => void;
  false?: () => void;
}

export type ComponentStatus = 'pristine' | 'running' | 'finished' | 'waiting';

/**
 * Interface for component instance
 * This is the basic interface for the component execution instance running on ZFlow Engine
 */
export abstract class Instance {

  static inputPort: ComponentInputPort;
  static outputPorts: ComponentOutputPort[];

  abstract get $engine(): Engine;
  abstract get $data(): Execution;
  
  $status: ComponentStatus;
  $event: ComponentEvent;
  $input: ComponentInput;
  $output: ComponentOutput;

  abstract setup(engine: Engine, data: Execution);

  abstract execute();
  abstract suspend();
  abstract resume();
  abstract finish();

}