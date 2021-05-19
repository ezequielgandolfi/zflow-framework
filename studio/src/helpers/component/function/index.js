import { buildNodeI1O2 } from "../../diagram/factory";

const components = require("@zflow/components");

export class FunctionComponent {
  static description = 'Function';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'command') };

  static components = [
    components.function.Log
  ];

}
