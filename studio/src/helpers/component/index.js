import * as ZFlowComponents from "@zflow/components";
import { HANDLE_COLOR, NODE_HANDLE_TYPE, NODE_COLOR } from "../diagram/const";
import { buildNodeI1O2, buildNodeI1, buildNodeI1O1, buildNodeO1 } from "../diagram/factory";

class AlertComponent {
  static description = 'Alert';
  static diagramNode = ({ data }) => { return buildNodeI1O1(data, 'bell') };
  static components = Object.values(ZFlowComponents.Component.alert);
}

class ConditionComponent {
  static description = 'Condition';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'stoplights', { output1: NODE_HANDLE_TYPE.output.true, output2: NODE_HANDLE_TYPE.output.false }, { output2: HANDLE_COLOR.alternative }) };
  static components = Object.values(ZFlowComponents.Component.condition);
}

class DatabaseComponent {
  static description = 'Database';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'server') };
  static components = Object.values(ZFlowComponents.Component.database);
}

class FunctionComponent {
  static description = 'Function';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'command') };
  static components = Object.values(ZFlowComponents.Component.function);
}

class JoinComponent {
  static description = 'Join process';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'stack', { input1: NODE_HANDLE_TYPE.input.multiple }, { input1: HANDLE_COLOR.multiple }) };
  static components = Object.values(ZFlowComponents.Component.join);
}

class MathComponent {
  static description = 'Math';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'percent') };
  static components = Object.values(ZFlowComponents.Component.math);
}

class MergeComponent {
  static description = 'Merge data';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'diagram-3') };
  static components = Object.values(ZFlowComponents.Component.merge);
}

class PauseComponent {
  static description = 'Pause';
  static diagramNode = ({ data }) => { return buildNodeI1O1(data, 'clock') };
  static components = Object.values(ZFlowComponents.Component.pause);
}

class ProcessComponent {
  static description = 'Process';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'cpu') };
  static components = Object.values(ZFlowComponents.Component.process);
}

class RepeatComponent {
  static description = 'Repeat';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'arrow-repeat', { output1: NODE_HANDLE_TYPE.output.repeat, output2: NODE_HANDLE_TYPE.output.end }, { output2: HANDLE_COLOR.alternative }) };
  static components = Object.values(ZFlowComponents.Component.repeat);
}

class RequestComponent {
  static description = 'Request';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'cloud') };
  static components = Object.values(ZFlowComponents.Component.request);
}

class StartComponent {
  static hideComponent = true;
  static description = 'Start';
  static diagramNode = ({ data }) => { return buildNodeO1(data, 'play-circle', null, { node: NODE_COLOR.ok }) };
  static components = Object.values(ZFlowComponents.Component.start);
}

class StopComponent {
  static description = 'Stop';
  static diagramNode = ({ data }) => { return buildNodeI1(data, 'exclamation-octagon', null, { input1: HANDLE_COLOR.error, node: NODE_COLOR.error }) };
  static components = Object.values(ZFlowComponents.Component.stop);
}

class StorageComponent {
  static description = 'Storage';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'hdd-stack') };
  static components = Object.values(ZFlowComponents.Component.storage);
}

class TransformComponent {
  static description = 'Transform data';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'shuffle') };
  static components = Object.values(ZFlowComponents.Component.transform);
}

class VariableComponent {
  static description = 'Variable';
  static diagramNode = ({ data }) => { return buildNodeI1O1(data, 'braces') };
  static components = Object.values(ZFlowComponents.Component.variable);
}


export class FlowComponents {
  static types = {
    alert: AlertComponent,
    condition: ConditionComponent,
    database: DatabaseComponent,
    function: FunctionComponent,
    join: JoinComponent,
    math: MathComponent,
    merge: MergeComponent,
    pause: PauseComponent,
    process: ProcessComponent,
    request: RequestComponent,
    repeat: RepeatComponent,
    start: StartComponent,
    stop: StopComponent,
    storage: StorageComponent,
    transform: TransformComponent,
    variable: VariableComponent
  }

  static nodes() {
    let result = { };
    Object.keys(FlowComponents.types).forEach(key => result[key] = FlowComponents.types[key].diagramNode);
    return result;
  }

  static getType(type) {
    return FlowComponents.types[type];
  }

  static getComponent(type, componentKey) {
    const component = FlowComponents.getType(type);
    if (component) {
      return component.components.find(item => item.key === componentKey);
    }
  }

  static getTypeProperty(type, componentKey, propKey) {
    const componentType = FlowComponents.getComponent(type, componentKey);
    if (componentType) {
      return componentType.properties.find(item => item.key === propKey);
    }
  }

  static getTypePropertiesDefaultValues(type, componentKey) {
    const result = { };
    const componentType = FlowComponents.getComponent(type, componentKey);
    if (componentType) {
      componentType.properties.forEach(item => result[item.key] = item.type.default);
    }
    return result;
  }

  static updateComponentType(component) {
    const componentClass = FlowComponents.getType(component.type);
    const componentData = componentClass.components.find(item => item.key === component.data.component);
    component.data.label = componentData.shortDescription;
  }

}
