import * as threads from "worker_threads";
import { EngineFunctions } from "./engine-functions";
import * as ZFlowComponents from "@zflow/components";
import * as ZFlowTypes from "@zflow/types";

const { flow, initData } = threads.workerData;

const engineFunctions = new EngineFunctions();
engineFunctions.flow.setFlow(flow);

function getComponent(key) {
  const k = Object.keys(ZFlowComponents.Component).find(k => ZFlowComponents.Component[k].key === key);
  if (k) {
    return ZFlowComponents.Component[k];
  }
}

function deepCopy(props) {
  return JSON.parse(JSON.stringify(props));
}

function transformProps(props) {
  Object.keys(props).forEach(k => {
    try {
      let value = props[k];
      if (typeof(value) === "string") {
        const prop = ZFlowComponents.Util.value2property(value);
        if (prop.component) {
          const sourceComponent = engineFunctions.flow.getStoredComponent(prop.component.id);
          if (sourceComponent) {
            let sourceProperty = sourceComponent[prop.component.property];
            if (ZFlowTypes.DataType.isZFlowDataType(sourceProperty)) {
              sourceProperty = sourceProperty.get();
              if (prop.component.childProperty) {
                props[k] = sourceProperty[prop.component.childProperty];
              }
              else {
                props[k] = sourceProperty;
              }
            }
          }
        }
      }
    }
    catch {
      // invalid value
      props[k] = null;
    }
  });
  return props;
}

function execComponent(component) {
  let thisComponent: ZFlowTypes.Component.Instance = engineFunctions.flow.getStoredComponent(component.id) 
  if (!thisComponent) {
    const componentClass = getComponent(component.type);
    thisComponent = new componentClass();
    thisComponent.setup(engineFunctions, component);

    engineFunctions.flow.storeComponent(component.id, thisComponent);

    thisComponent.$event.on("complete", event => { 
      next(component.id, event.type, event.data);
    });

    thisComponent.$event.on("resume", event => { 
      engineFunctions.flow.resume(thisComponent);
    });
  }

  thisComponent.$input.inject(transformProps(deepCopy(component.data.properties)));
  engineFunctions.flow.execute(thisComponent);
}

function next(id, handle, data) {
  const outputs = engineFunctions.flow.getNext(id, handle);
  outputs.forEach(component => execComponent(component));
}


//
const startComponent = flow.find(item => item.type.startsWith("start."));
if (startComponent) {
  Object.assign(startComponent.data.properties, initData);
  execComponent(startComponent);
}
