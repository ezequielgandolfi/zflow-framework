import React from 'react';
import { Handle } from 'react-flow-renderer';

//#region Style
const borderColor = {
  ok: {
    borderColor: 'green'
  },
  error: {
    borderColor: 'red'
  }
};
const backgroundColor = {
  ok: {
    backgroundColor: 'green'
  },
  error: {
    backgroundColor: 'red'
  },
  alternative: {
    backgroundColor: 'coral'
  },
  multiple: {
    backgroundColor: 'deepskyblue'
  }
};
const position = {
  single: {
    center: {
    }
  },
  double: {
    top: {
      top: '30%'
    },
    bottom: {
      top: '70%'
    }
  }
}

const nodeStyle = {
  padding: '8px',
  borderRadius: '3px',
  width: '60px',
  minHeight: '50px',
  fontSize: '10px',
  color: '#222',
  textAlign: 'center',
  borderWidth: '1px',
  borderStyle: 'solid'
};
const handleStyle = {
  width: '8px',
  height: '8px'
};
//#endregion

//#region Factory
const NodeI1O2 = (data, icon, ports, colors) => {
  const portI1 = ports?.input1 ? ports.input1 : NODE_HANDLE_TYPE.input.single;
  const portO1 = ports?.output1 ? ports.output1 : NODE_HANDLE_TYPE.output.default;
  const portO2 = ports?.output2 ? ports.output2 : NODE_HANDLE_TYPE.output.error;
  const colorI1 = colors?.input1 ? colors.input1 : { };
  const colorO1 = colors?.output1 ? colors.output1 : backgroundColor.ok;
  const colorO2 = colors?.output2 ? colors.output2 : backgroundColor.error;
  icon = `bi bi-${icon}`;
  return (
    <div style={nodeStyle}>
      <Handle 
        type="target" 
        position="left" 
        id={portI1}
        style={{...handleStyle, ...colorI1}}
      />
      <div className="diagram-node-id">{data.id}</div>
      <div><i className={icon}></i></div>
      <div className="diagram-node-type">{data.label}</div>
      <Handle
        type="source"
        position="right"
        id={portO1}
        style={{...handleStyle, ...position.double.top, ...colorO1}}
      />
      <Handle
        type="source"
        position="right"
        id={portO2}
        style={{...handleStyle, ...position.double.bottom, ...colorO2}}
      />
    </div>
  );
};
const NodeI1O1 = (data, icon, ports, colors) => {
  const portI1 = ports?.input1 ? ports.input1 : NODE_HANDLE_TYPE.input.single;
  const portO1 = ports?.output1 ? ports.output1 : NODE_HANDLE_TYPE.output.default;
  const colorI1 = colors?.input1 ? colors.input1 : { };
  const colorO1 = colors?.output1 ? colors.output1 : backgroundColor.ok;
  icon = `bi bi-${icon}`;
  return (
    <div style={nodeStyle}>
      <div className="diagram-node-id">{data.id}</div>
      <Handle 
        type="target" 
        position="left" 
        id={portI1}
        style={{...handleStyle, ...colorI1}}
      />
      <div><i className={icon}></i></div>
      <div className="diagram-node-type">{data.label}</div>
      <Handle
        type="source"
        position="right"
        id={portO1}
        style={{...handleStyle, ...colorO1}}
      />
    </div>
  );
};
//#endregion

//#region Component - Alert
class AlertComponent_Force {
  static key = 'force'
  static description = 'Force alert condition';
  static shortDescription = 'Force';

  static properties = { };
}

class AlertComponent {
  static description = 'Alert';
  static diagramNode = ({ data }) => { return NodeI1O1(data, 'bell') };

  static components = [
    AlertComponent_Force
  ];

}
//#endregion

//#region Component - Condition
class ConditionComponent_All {
  static key = 'all'
  static description = 'All conditions must be valid';
  static shortDescription = 'All';
  
  static properties = { };
}

class ConditionComponent_Any {
  static key = 'any'
  static description = 'Any condition must be valid';
  static shortDescription = 'Any';

  static properties = { };
}

class ConditionComponent {
  static description = 'Condition';
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'stoplights', { output1: NODE_HANDLE_TYPE.output.true, output2: NODE_HANDLE_TYPE.output.false }, { output2: backgroundColor.alternative }) };

  static components = [
    ConditionComponent_All,
    ConditionComponent_Any
  ];

}
//#endregion

//#region Component - Function
class FunctionComponent_Dummy {
  static key = 'dummy'
  static description = 'Nothing...';
  static shortDescription = 'Dummy';

  static properties = { };
}

class FunctionComponent {
  static description = 'Function';
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'tools') };

  static components = [
    FunctionComponent_Dummy
  ];

}
//#endregion

//#region Component - Join
class JoinComponent_First {
  static key = 'first'
  static description = 'Go on first event';
  static shortDescription = 'First';

  static properties = { };
}

class JoinComponent_All {
  static key = 'all'
  static description = 'Wait all events';
  static shortDescription = 'All';

  static properties = { };
}

class JoinComponent {
  static description = 'Join process';
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'stack', { input1: NODE_HANDLE_TYPE.input.multiple }, { input1: backgroundColor.multiple }) };

  static components = [
    JoinComponent_First,
    JoinComponent_All
  ];

}
//#endregion

//#region Component - Math
class MathComponent_Sum {
  static key = 'sum'
  static description = 'Sum values';
  static shortDescription = 'Sum';

  static properties = { };
}

class MathComponent {
  static description = 'Math';
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'percent') };

  static components = [
    MathComponent_Sum
  ];

}
//#endregion

//#region Component - Merge
class MergeComponent_Array {
  static key = 'array'
  static description = 'Merge array items';
  static shortDescription = 'Array';

  static properties = { };
}

class MergeComponent {
  static description = 'Merge data';
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'diagram-3') };

  static components = [
    MergeComponent_Array
  ];

}
//#endregion

//#region Component - Pause
class PauseComponent_Delay {
  static key = 'delay'
  static description = 'Delay a certain amount of time';
  static shortDescription = 'Delay';

  static properties = { };
}

class PauseComponent {
  static description = 'Pause';
  static diagramNode = ({ data }) => { return NodeI1O1(data, 'clock') };

  static components = [
    PauseComponent_Delay
  ];

}
//#endregion

//#region Component - Process
class ProcessComponent_Flow {
  static key = 'flow'
  static description = 'Execute';
  static shortDescription = 'Flow';

  static properties = { };
}

class ProcessComponent {
  static description = 'Process';
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'cpu') };

  static components = [
    ProcessComponent_Flow
  ];

}
//#endregion

//#region Component - Request
class RequestComponent_Get {
  static key = 'get'
  static description = 'GET request';
  static shortDescription = 'Get';

  static properties = { };
}
class RequestComponent {
  static description = 'Request';
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'cloud') };

  static components = [
    RequestComponent_Get
  ];

}
//#endregion

//#region Component - Repeat
class RepeatComponent_For {
  static key = 'for'
  static description = 'FOR loop within a range';
  static shortDescription = 'For';

  static properties = { };
}

class RepeatComponent_Each {
  static key = 'each'
  static description = 'Iterates over a list';
  static shortDescription = 'Each';

  static properties = { };
}

class RepeatComponent {
  static description = 'Repeat';
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'arrow-repeat', { output1: NODE_HANDLE_TYPE.output.repeat, output2: NODE_HANDLE_TYPE.output.end }, { output2: backgroundColor.alternative }) };

  static components = [
    RepeatComponent_For,
    RepeatComponent_Each
  ];

}
//#endregion

//#region Component - Start
class StartComponent_Start {
  static key = 'trigger'
  static description = 'Triggered start';
  static shortDescription = 'Start';

  static properties = { };
}

class StartComponent {
  static hideComponent = true;
  static description = 'Start';
  static diagramNode = ({ data }) => { 
    return (
      <div style={{...nodeStyle,...borderColor.ok}}>
        <div><i className="bi bi-play-circle"></i></div>
        <div>Start</div>
        <Handle
          type="source"
          position="right"
          id={NODE_HANDLE_TYPE.output.default}
          style={{...handleStyle, ...backgroundColor.ok}}
        />
      </div>
    );
  };

  static components = [
    StartComponent_Start
  ];

}
//#endregion

//#region Component - Stop
class StopComponent_Stop {
  static key = 'trigger'
  static description = 'Stop with error condition';
  static shortDescription = 'Stop';

  static properties = { };
}

class StopComponent {
  static description = 'Stop';
  static diagramNode = ({ data }) => { 
    return (
      <div style={{...nodeStyle,...borderColor.error}}>
        <Handle 
          type="target" 
          position="left" 
          id={NODE_HANDLE_TYPE.input.multiple}
          style={{...handleStyle, ...backgroundColor.error}} 
        />
        <div><i className="bi bi-exclamation-octagon"></i></div>
        <div>Stop</div>
      </div>
    );
  };

  static components = [
    StopComponent_Stop
  ];

}
//#endregion

//#region Component - Storage
class StorageComponent_ReadFile {
  static key = 'readfile'
  static description = 'Read a data file';
  static shortDescription = 'Read file';

  static properties = { };
}

class StorageComponent {
  static description = 'Storage';
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'hdd-stack') };

  static components = [
    StorageComponent_ReadFile
  ];

}
//#endregion

//#region Component - Transform
class TransformComponent_Object2Object {
  static key = 'o2o'
  static description = 'Object to object';
  static shortDescription = 'Obj<->Obj';

  static properties = { };
}

class TransformComponent {
  static description = 'Transform data';
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'shuffle') };

  static components = [
    TransformComponent_Object2Object
  ];

}
//#endregion

//#region Component - Variable
class VariableComponent_Set {
  static key = 'set'
  static description = 'Set a value';
  static shortDescription = 'Set';

  static properties = { };
}

class VariableComponent {
  static description = 'Variable';
  static diagramNode = ({ data }) => { return NodeI1O1(data, 'braces') };

  static components = [
    VariableComponent_Set
  ];

}
//#endregion

export class CustomComponents {
  static components = {
    alert: AlertComponent,
    condition: ConditionComponent,
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
    Object.keys(CustomComponents.components).forEach(key => { result[key] = CustomComponents.components[key].diagramNode });
    return result;
  }

  static getComponent(node) {
    return CustomComponents.components[node];
  }
}

export const NODE_HANDLE_TYPE = {
  input: {
    single: 'single',
    multiple: 'multi'
  },
  output: {
    default: 'ok',
    error: 'error',
    repeat: 'repeat',
    end: 'end',
    true: 'true',
    false: 'false'
  }
}