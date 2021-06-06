import * as ZFlowComponents from "@zflow/components";
import { HANDLE_COLOR, NODE_HANDLE_TYPE, NODE_COLOR } from "../diagram/const";
import { DiagramNodeFactory } from "../diagram/factory";

const diagramNodeFactory = new DiagramNodeFactory();

function buildDiagramNode(componentClass) {
  const inputPort = componentClass.inputPort; //none, single, multiple
  const outputPorts = componentClass.outputPorts; //ok, error, true, false, repeat, end

  const fnNode = diagramNodeFactory.getFactory(inputPort === "none" ? 0 : 1, outputPorts.length);
  const ports = { };
  const colors = { };

  if (inputPort === "none") {
    // Start component
    colors.node = NODE_COLOR.start;
  }
  else {
    ports.input1 = NODE_HANDLE_TYPE.input[inputPort];
    colors.input1 = HANDLE_COLOR[inputPort];
  }

  if (outputPorts.length === 0) {
    // Stop component
    colors.node = NODE_COLOR.stop;
    colors.input1 = HANDLE_COLOR.error;
  }
  else {
    for (let iOutput = 0; iOutput < outputPorts.length; iOutput++) {
      const output = outputPorts[iOutput];
      ports[`output${iOutput+1}`] = NODE_HANDLE_TYPE.output[output];
      colors[`output${iOutput+1}`] = HANDLE_COLOR[output];
    }
  }

  return ({ data }) => { return fnNode(data, componentClass.icon, ports, colors) };
}

function buildComponentList() {
  const result = { };
  Object.values(ZFlowComponents.Component).forEach(componentClass => {
    result[componentClass.key] = {
      key: componentClass.key,
      description: componentClass.description,
      shortDescription: componentClass.shortDescription,
      properties: componentClass.properties,
      hidden: (componentClass.inputPort === "none"),
      component: componentClass,
      diagramNode: buildDiagramNode(componentClass)
    }
  });
  return result;
}


export class FlowComponents {
  static components = buildComponentList();

  // REMOVE
  static types = {
  }

  static nodes() {
    let result = { };
    Object.values(FlowComponents.components).forEach(componentClass => result[componentClass.key] = componentClass.diagramNode);
    return result;
  }

  static getComponent(key) {
    return FlowComponents.components[key];
  }

  static getComponentProperty(key, propKey) {
    const component = FlowComponents.getComponent(key);
    if (component) {
      return component.properties.find(item => item.key === propKey);
    }
  }

  static getComponentPropertiesDefaultValues(key) {
    const result = { };
    const component = FlowComponents.getComponent(key);
    if (component) {
      component.properties.forEach(item => result[item.key] = '');
    }
    return result;
  }

}
