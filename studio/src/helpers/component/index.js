import { AlertComponent } from "./alert";
import { ConditionComponent } from "./condition";
import { DatabaseComponent } from "./database";
import { FunctionComponent } from "./function";
import { JoinComponent } from "./join";
import { MathComponent } from "./math";
import { MergeComponent } from "./merge";
import { PauseComponent } from "./pause";
import { ProcessComponent } from "./process";
import { RepeatComponent } from "./repeat";
import { RequestComponent } from "./request";
import { StartComponent } from "./start";
import { StopComponent } from "./stop";
import { StorageComponent } from "./storage";
import { TransformComponent } from "./transform";
import { VariableComponent } from "./variable";
// import * as ZFlowComponents from "@zflow/components";

function buildComponentList() {
  let result = {};
  // Object.keys(ZFlowComponents.Component).forEach(typeKey => {
  //   const type = {
  //     hideComponent: (typeKey === "start"),
  //     description: (typeKey.substring(0,1).toUpperCase() + typeKey.substring(1)),
  //     diagramNode: '',
  //     components: Object.values(ZFlowComponents.Component[typeKey])
  //   }
  //   result[typeKey] = type;
  // });
  return result;
}

// const buildComponent = (baseClass) => {
//   return {
//     hideComponent = true,
//     description = 'Start',
//     diagramNode = ({ data }) => { return buildNodeO1(data, 'play-circle', null, { node: NODE_COLOR.ok }) },
//     components = [
//       ZFlowComponents.Component.start.Start
//     ]
//   }
// }


export class ZFlowComponents {
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
    Object.keys(ZFlowComponents.types).forEach(key => result[key] = ZFlowComponents.types[key].diagramNode);
    return result;
  }

  static getType(type) {
    return ZFlowComponents.types[type];
  }

  static getComponent(type, componentKey) {
    const component = ZFlowComponents.getType(type);
    if (component) {
      return component.components.find(item => item.key === componentKey);
    }
  }

  static getTypeProperty(type, componentKey, propKey) {
    const componentType = ZFlowComponents.getComponent(type, componentKey);
    if (componentType) {
      return componentType.properties.find(item => item.key === propKey);
    }
  }

  static getTypePropertiesDefaultValues(type, componentKey) {
    const result = { };
    const componentType = ZFlowComponents.getComponent(type, componentKey);
    if (componentType) {
      componentType.properties.forEach(item => result[item.key] = item.type.default);
    }
    return result;
  }

  static updateComponentType(component) {
    const componentClass = ZFlowComponents.getType(component.type);
    const componentData = componentClass.components.find(item => item.key === component.data.component);
    component.data.label = componentData.shortDescription;
  }

}
