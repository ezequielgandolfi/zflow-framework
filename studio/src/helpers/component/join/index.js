import { HANDLE_COLOR, NODE_HANDLE_TYPE } from "../../diagram/const";
import { buildNodeI1O2 } from "../../diagram/factory";

const components = require("@zflow/components");

export class JoinComponent {
  static description = 'Join process';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'stack', { input1: NODE_HANDLE_TYPE.input.multiple }, { input1: HANDLE_COLOR.multiple }) };

  static components = [
    components.join.All,
    components.join.First
  ];

}
