import { HANDLE_COLOR, NODE_HANDLE_TYPE } from "../../diagram/const";
import { buildNodeI1O2 } from "../../diagram/factory";

const components = require("@zflow/components/repeat");

export class RepeatComponent {
  static description = 'Repeat';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'arrow-repeat', { output1: NODE_HANDLE_TYPE.output.repeat, output2: NODE_HANDLE_TYPE.output.end }, { output2: HANDLE_COLOR.alternative }) };

  static components = [
    components.Each,
    components.For
  ];

}
