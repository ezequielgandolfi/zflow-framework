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

export interface Execution {
  id: string;
  type: string;
  data: ComponentData;
  position: ComponentPosition;
}

export interface Output {
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
}

export type Any = Execution | Output;