import { HANDLE_COLOR, NODE_COLOR } from "../../diagram/const";
import { buildNodeI1 } from "../../diagram/factory";

class StopComponent_Stop {
  static key = 'trigger'
  static description = 'Stop with error condition';
  static shortDescription = 'Stop';

  static properties = [];
}

export class StopComponent {
  static description = 'Stop';
  static diagramNode = ({ data }) => { return buildNodeI1(data, 'exclamation-octagon', null, { input1: HANDLE_COLOR.error, node: NODE_COLOR.error }) };

  static components = [
    StopComponent_Stop
  ];

}
