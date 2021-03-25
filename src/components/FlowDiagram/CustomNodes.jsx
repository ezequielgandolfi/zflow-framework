import React from 'react';
import { Handle } from 'react-flow-renderer';

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

const nodeLabelStyle = {
  position: 'fixed',
  top: '0px',
  left: '3px',
  fontSize: 'smaller',
  fontFamily: 'monospace'
}

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
      <div style={nodeLabelStyle}>{data.id}</div>
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
      <div style={nodeLabelStyle}>{data.id}</div>
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

class AlertComponent {
  static diagramNode = ({ data }) => { return NodeI1O1(data, 'bell') };

  static components = [
  ];

}

class ConditionComponent_All {
  static key = 'all'
  static description = 'All conditions must be valid';
  static shortDescription = 'All';
}

class ConditionComponent_Any {
  static key = 'any'
  static description = 'Any condition must be valid';
  static shortDescription = 'Any';
}

class ConditionComponent {
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'stoplights', { output1: NODE_HANDLE_TYPE.output.true, output2: NODE_HANDLE_TYPE.output.false }, { output2: backgroundColor.alternative }) };

  static components = [
    ConditionComponent_All,
    ConditionComponent_Any
  ];

}

class FunctionComponent {
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'tools') };

  static components = [
  ];

}

class JoinComponent {
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'stack', { input1: NODE_HANDLE_TYPE.input.multiple }, { input1: backgroundColor.multiple }) };

  static components = [
  ];

}

class MathComponent {
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'percent') };

  static components = [
  ];

}

class MergeComponent {
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'diagram-3') };

  static components = [
  ];

}

class PauseComponent {
  static diagramNode = ({ data }) => { return NodeI1O1(data, 'clock') };

  static components = [
  ];

}

class ProcessComponent {
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'cpu') };

  static components = [
  ];

}

class RequestComponent {
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'cloud') };

  static components = [
  ];

}

class RepeatComponent {
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'arrow-repeat', { output1: NODE_HANDLE_TYPE.output.repeat, output2: NODE_HANDLE_TYPE.output.end }, { output2: backgroundColor.alternative }) };

  static components = [
  ];

}

class StartComponent {
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
  ];

}

class StopComponent {
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
  ];

}

class StorageComponent {
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'hdd-stack') };

  static components = [
  ];

}

class TransformComponent {
  static diagramNode = ({ data }) => { return NodeI1O2(data, 'shuffle') };

  static components = [
  ];

}

class VariableComponent {
  static diagramNode = ({ data }) => { return NodeI1O1(data, 'braces') };

  static components = [
  ];

}

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

// export const CustomNodes = {
//   alert: AlertComponent.diagramNode,
//   condition: ConditionComponent.diagramNode,
//   function: FunctionNode,
//   join: JoinNode,
//   math: MathNode,
//   merge: MergeNode,
//   pause: PauseNode,
//   process: ProcessNode,
//   request: RequestNode,
//   repeat: RepeatNode,
//   start: StartNode,
//   stop: StopNode,
//   storage: StorageNode,
//   transform: TransformNode,
//   variable: VariableNode
// }

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