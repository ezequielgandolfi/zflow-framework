const threads = require("worker_threads");
const components = require("@zflow/components");
const componentUtil = require("@zflow/components/util");

const flow = threads.workerData.flow;
const initData = threads.workerData.initData;

const storedComponents = { };

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
        const component = storedComponents[prop.component.id];
        if (component) {
          props[k] = component[prop.component.property];
        }
      }
    }
  });
  return props;
}

function execComponent(component) {
  const componentClass = getComponent(component.type, component.data.component);
  let props = transformProps(deepCopy(component.data.properties));
  const thisComponent = new componentClass();
  storedComponents[component.id] = thisComponent;

  thisComponent.change.on("status", event => { 
    next(component.id, event.type, event.data);
  });

  thisComponent.setup({});
  thisComponent.inject(props);
  process.nextTick(() => thisComponent.execute());
}

function next(id, handle, data) {
  const outputs = flow.filter(item => (item.source === id) && (item.sourceHandle === handle));
  outputs.forEach(output => {
    const component = flow.find(item => item.id === output.target);
    execComponent(component);
  });
}



//
const startComponent = flow.find(item => item.type === "start");
if (startComponent) {
  Object.assign(startComponent.data.properties, initData);
  execComponent(startComponent);
}
