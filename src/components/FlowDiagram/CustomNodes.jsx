import React from 'react';
import { Handle } from 'react-flow-renderer';
import iconAlert from "../../assets/diagram/alert.svg";
import iconCondition from "../../assets/diagram/condition.svg";
import iconFunction from "../../assets/diagram/function.svg";
import iconJoin from "../../assets/diagram/join.svg";
import iconMath from "../../assets/diagram/math.svg";
import iconMerge from "../../assets/diagram/merge.svg";
import iconPause from "../../assets/diagram/pause.svg";
import iconProcess from "../../assets/diagram/process.svg";
import iconRequest from "../../assets/diagram/request.svg";
import iconRepeat from "../../assets/diagram/repeat.svg";
import iconStart from "../../assets/diagram/start.svg";
import iconStop from "../../assets/diagram/stop.svg";
import iconStorage from "../../assets/diagram/storage.svg";
import iconTransform from "../../assets/diagram/transform.svg";
import iconVariable from "../../assets/diagram/variable.svg";


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
const iconStyle = {
  width: '20px',
  height: '20px',
  margin: '2px'
}
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
  return (
    <div style={nodeStyle}>
      <Handle 
        type="target" 
        position="left" 
        id={portI1}
        style={{...handleStyle, ...colorI1}}
      />
      <div style={nodeLabelStyle}>{data.id}</div>
      <div><img src={icon} style={iconStyle} alt={data.label}/></div>
      <div>{data.label}</div>
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
  return (
    <div style={nodeStyle}>
      <div style={nodeLabelStyle}>{data.id}</div>
      <Handle 
        type="target" 
        position="left" 
        id={portI1}
        style={{...handleStyle, ...colorI1}}
      />
      <div><img src={icon} style={iconStyle} alt={data.label}/></div>
      <div>{data.label}</div>
      <Handle
        type="source"
        position="right"
        id={portO1}
        style={{...handleStyle, ...colorO1}}
      />
    </div>
  );
};

const AlertNode = ({ data }) => {
  return NodeI1O1(data, iconAlert);
};

const ConditionNode = ({ data }) => {
  return NodeI1O2(data, iconCondition, { output1: NODE_HANDLE_TYPE.output.true, output2: NODE_HANDLE_TYPE.output.false }, { output2: backgroundColor.alternative });
};

const FunctionNode = ({ data }) => {
  return NodeI1O2(data, iconFunction);
};

const JoinNode = ({ data }) => {
  return NodeI1O2(data, iconJoin, { input1: NODE_HANDLE_TYPE.input.multiple });
};

const MathNode = ({ data }) => {
  return NodeI1O2(data, iconMath);
};

const MergeNode = ({ data }) => {
  return NodeI1O2(data, iconMerge);
};

const PauseNode = ({ data }) => {
  return NodeI1O1(data, iconPause);
};

const ProcessNode = ({ data }) => {
  return NodeI1O2(data, iconProcess);
};

const RequestNode = ({ data }) => {
  return NodeI1O2(data, iconRequest);
};

const RepeatNode = ({ data }) => {
  return NodeI1O2(data, iconRepeat, { output1: NODE_HANDLE_TYPE.output.repeat, output2: NODE_HANDLE_TYPE.output.end }, { output2: backgroundColor.alternative });
};

const StartNode = ({ data }) => {
  return (
    <div style={{...nodeStyle,...borderColor.ok}}>
      <div><img src={iconStart} style={iconStyle} alt={data.label}/></div>
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

const StopNode = ({ data }) => {
  return (
    <div style={{...nodeStyle,...borderColor.error}}>
      <Handle 
        type="target" 
        position="left" 
        id={NODE_HANDLE_TYPE.input.multiple}
        style={{...handleStyle, ...backgroundColor.error}} 
      />
      <div><img src={iconStop} style={iconStyle} alt={data.label}/></div>
      <div>Stop</div>
    </div>
  );
};

const StorageNode = ({ data }) => {
  return NodeI1O2(data, iconStorage);
};

const TransformNode = ({ data }) => {
  return NodeI1O2(data, iconTransform);
};

const VariableNode = ({ data }) => {
  return NodeI1O1(data, iconVariable);
};

export const CustomNodes = {
  alert: AlertNode,
  condition: ConditionNode,
  function: FunctionNode,
  join: JoinNode,
  math: MathNode,
  merge: MergeNode,
  pause: PauseNode,
  process: ProcessNode,
  request: RequestNode,
  repeat: RepeatNode,
  start: StartNode,
  stop: StopNode,
  storage: StorageNode,
  transform: TransformNode,
  variable: VariableNode
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