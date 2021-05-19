import { buildNodeI1O2 } from "../../diagram/factory";

const components = require("@zflow/components");

export class MathComponent {
  static description = 'Math';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'percent') };

  static components = [
    components.math.Sum
  ];

}
