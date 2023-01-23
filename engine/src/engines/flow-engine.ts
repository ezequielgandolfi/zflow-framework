import * as threads from 'worker_threads';
import { FlowEngineCore } from './flow-engine-core';
import * as ZFlowComponents from '@zflow/components';
import * as ZFlowTypes from '@zflow/types';

const { flow, initData } = threads.workerData;

const engineCore = new FlowEngineCore();
engineCore.flow.setFlow(flow);

function getComponent(key) {
  const k = Object.keys(ZFlowComponents.Component).find(k => ZFlowComponents.Component[k].key === key);
  if (k) {
    return ZFlowComponents.Component[k];
  }
}

function deepCopy(props) {
  return JSON.parse(JSON.stringify(props));
}

function execComponent(component) {
  let thisComponent: ZFlowTypes.Component.Instance = engineCore.flow.getStoredComponent(component.id) 
  if (!thisComponent) {
    const componentClass = getComponent(component.type);
    thisComponent = new componentClass();
    thisComponent.setup(engineCore, component);

    engineCore.flow.storeComponent(component.id, thisComponent);

    thisComponent.$event.on('complete', event => { 
      next(component.id, event.type, event.data);
    });

    thisComponent.$event.on('resume', event => { 
      engineCore.flow.resume(thisComponent);
    });
  }
  thisComponent.$input.inject(engineCore.functions.transformProperties(deepCopy(component.data.properties)));
  engineCore.flow.execute(thisComponent);
}

function next(id, handle, data) {
  const outputs = engineCore.flow.getNext(id, handle);
  outputs.forEach(component => execComponent(component));
}


//
const startComponent = flow.find(item => item.type.startsWith('start.'));
if (startComponent) {
  Object.assign(startComponent.data.properties, initData);
  execComponent(startComponent);
}
