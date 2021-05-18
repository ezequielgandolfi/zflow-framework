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


export class ZFlowComponents {
  static components = {
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
    Object.keys(ZFlowComponents.components).forEach(key => { result[key] = ZFlowComponents.components[key].diagramNode });
    return result;
  }

  static getComponent(key) {
    return ZFlowComponents.components[key];
  }

  static getComponentType(key, type) {
    const component = ZFlowComponents.getComponent(key);
    if (component) {
      return component.components.find(item => item.key === type);
    }
  }

  static getComponentTypeProperty(key, type, prop) {
    const componentType = ZFlowComponents.getComponentType(key, type);
    if (componentType) {
      return componentType.properties.find(item => item.key === prop);
    }
  }

  static getComponentTypePropertyDefaults(key, type) {
    const componentType = ZFlowComponents.getComponentType(key, type);
    if (componentType) {
      const result = { };
      componentType.properties.forEach(item => {
        result[item.key] = item.type.default;
      });
      return result;
    }
    return { };
  }

  static updateComponentType(component) {
    const componentClass = ZFlowComponents.getComponent(component.type);
    const componentType = componentClass.components.find(item => item.key === component.data.component);
    component.data.label = componentType.shortDescription;
  }

}
