const threads = require("worker_threads");
const components = require("@zflow/components");
const componentUtil = require("@zflow/components/util");
const EngineFunctions = require("./engine-functions");

const { flow, initData } = threads.workerData;

const engineFunctions = new EngineFunctions();
engineFunctions.flow.setFlow(flow);

function getComponent(type,key) {
  const t = components[type];
  if (t) {
    const k = Object.keys(t).find(k => t[k].key === key);
    if (k) {
      return t[k];
    }
  }
}

function deepCopy(props) {
  return JSON.parse(JSON.stringify(props));
}

function transformProps(props) {
  Object.keys(props).forEach(k => {
    let value = props[k];
    if (typeof(value) === "string") {
      const prop = componentUtil.value2property(value);
      if (prop.component) {
        const component = engineFunctions.flow.getStoredComponent(prop.component.id);
        if (component) {
          props[k] = component[prop.component.property];
        }
      }
    }
  });
  return props;
}

function execComponent(component) {
  let thisComponent = engineFunctions.flow.getStoredComponent(component.id) 
  if (!thisComponent) {
    const componentClass = getComponent(component.type, component.data.component);
    thisComponent = new componentClass();
    thisComponent.setup(engineFunctions, component);
    engineFunctions.flow.storeComponent(component.id, thisComponent);
  
    thisComponent.change.on(engineFunctions.flow.CONSTS.EXEC.STATUS_CHANGE, event => { 
      engineFunctions.flow.updateWatchers();
      next(component.id, event.type, event.data);
    });

    thisComponent.change.on(engineFunctions.flow.CONSTS.EXEC.AGAIN, event => { 
      process.nextTick(() => thisComponent.execute());
    });
  }

  let props = transformProps(deepCopy(component.data.properties));
  thisComponent.inject(props);
  process.nextTick(() => thisComponent.execute());
}

function next(id, handle, data) {
  const outputs = engineFunctions.flow.getNext(id, handle);
  outputs.forEach(component => execComponent(component));
}



//
const startComponent = flow.find(item => item.type === "start");
if (startComponent) {
  Object.assign(startComponent.data.properties, initData);
  execComponent(startComponent);
}
