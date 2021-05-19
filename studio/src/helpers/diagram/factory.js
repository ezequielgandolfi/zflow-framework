import { Handle } from "react-flow-renderer";
import { HANDLE_COLOR, HANDLE_INPUT_POSITION, NODE_HANDLE_TYPE } from "./const";

//#region Style
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

export function buildNodeI1O2(data, icon, ports, colors) {
  const portI1 = ports?.input1 ? ports.input1 : NODE_HANDLE_TYPE.input.single;
  const portO1 = ports?.output1 ? ports.output1 : NODE_HANDLE_TYPE.output.default;
  const portO2 = ports?.output2 ? ports.output2 : NODE_HANDLE_TYPE.output.error;
  const hColorI1 = colors?.input1 ? colors.input1 : { };
  const hColorO1 = colors?.output1 ? colors.output1 : HANDLE_COLOR.ok;
  const hColorO2 = colors?.output2 ? colors.output2 : HANDLE_COLOR.error;
  const nColor = colors?.node ? colors.node : { };
  const divClassName = data.$selected ? 'diagram-node-selected' : '';
  icon = `bi bi-${icon}`;
  return (
    <div style={{...nodeStyle,...nColor}} className={divClassName}>
      <Handle 
        type="target" 
        position="left" 
        id={portI1}
        style={{...handleStyle, ...hColorI1}}
      />
      <div className="diagram-node-id">{data.id}</div>
      <div><i className={icon}></i></div>
      <div className="diagram-node-type">{data.label}</div>
      <Handle
        type="source"
        position="right"
        id={portO1}
        style={{...handleStyle, ...HANDLE_INPUT_POSITION.double.top, ...hColorO1}}
      />
      <Handle
        type="source"
        position="right"
        id={portO2}
        style={{...handleStyle, ...HANDLE_INPUT_POSITION.double.bottom, ...hColorO2}}
      />
    </div>
  );
}

export function buildNodeI1O1(data, icon, ports, colors) {
  const portI1 = ports?.input1 ? ports.input1 : NODE_HANDLE_TYPE.input.single;
  const portO1 = ports?.output1 ? ports.output1 : NODE_HANDLE_TYPE.output.default;
  const hColorI1 = colors?.input1 ? colors.input1 : { };
  const hColorO1 = colors?.output1 ? colors.output1 : HANDLE_COLOR.ok;
  const nColor = colors?.node ? colors.node : { };
  const divClassName = data.$selected ? 'diagram-node-selected' : '';
  icon = `bi bi-${icon}`;
  return (
    <div style={{...nodeStyle,...nColor}} className={divClassName}>
      <div className="diagram-node-id">{data.id}</div>
      <Handle 
        type="target" 
        position="left" 
        id={portI1}
        style={{...handleStyle, ...hColorI1}}
      />
      <div><i className={icon}></i></div>
      <div className="diagram-node-type">{data.label}</div>
      <Handle
        type="source"
        position="right"
        id={portO1}
        style={{...handleStyle, ...hColorO1}}
      />
    </div>
  );
}

export function buildNodeO1(data, icon, ports, colors) {
  const portO1 = ports?.output1 ? ports.output1 : NODE_HANDLE_TYPE.output.default;
  const hColorO1 = colors?.output1 ? colors.output1 : HANDLE_COLOR.ok;
  const nColor = colors?.node ? colors.node : { };
  const divClassName = data.$selected ? 'diagram-node-selected' : '';
  icon = `bi bi-${icon}`;
  return (
    <div style={{...nodeStyle,...nColor}} className={divClassName}>
      <div className="diagram-node-id">{data.id}</div>
      <div><i className={icon}></i></div>
      <div className="diagram-node-type">{data.label}</div>
      <Handle
        type="source"
        position="right"
        id={portO1}
        style={{...handleStyle, ...hColorO1}}
      />
    </div>
  );
}

export function buildNodeI1(data, icon, ports, colors) {
  const portI1 = ports?.input1 ? ports.input1 : NODE_HANDLE_TYPE.input.single;
  const hColorI1 = colors?.input1 ? colors.input1 : { };
  const nColor = colors?.node ? colors.node : { };
  const divClassName = data.$selected ? 'diagram-node-selected' : '';
  icon = `bi bi-${icon}`;
  return (
    <div style={{...nodeStyle,...nColor}} className={divClassName}>
      <Handle 
        type="target" 
        position="left" 
        id={portI1}
        style={{...handleStyle, ...hColorI1}}
      />
      <div className="diagram-node-id">{data.id}</div>
      <div><i className={icon}></i></div>
      <div className="diagram-node-type">{data.label}</div>
    </div>
  );
}
