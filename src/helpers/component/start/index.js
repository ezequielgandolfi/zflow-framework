import { NODE_COLOR } from "../../diagram/const";
import { buildNodeO1 } from "../../diagram/factory";
import { AddReadOnly, Property_PathParameter, Property_Payload, Property_QueryParameter } from "../property";

class StartComponent_Start {
  static key = 'trigger'
  static description = 'Triggered start';
  static shortDescription = 'Start';

  static properties = [
    AddReadOnly(Property_QueryParameter),
    AddReadOnly(Property_PathParameter),
    AddReadOnly(Property_Payload)
  ];
}

export class StartComponent {
  static hideComponent = true;
  static description = 'Start';

  static diagramNode = ({ data }) => { return buildNodeO1(data, 'play-circle', null, { node: NODE_COLOR.ok }) };

  // static diagramNode = ({ data }) => { 
  //   return (
  //     <div style={{...nodeStyle,...borderColor.ok}}>
  //       <div><i className="bi bi-play-circle"></i></div>
  //       <div>Start</div>
  //       <Handle
  //         type="source"
  //         position="right"
  //         id={NODE_HANDLE_TYPE.output.default}
  //         style={{...handleStyle, ...backgroundColor.ok}}
  //       />
  //     </div>
  //   );
  // };

  static components = [
    StartComponent_Start
  ];

}
