import { buildNodeI1O2 } from "../../diagram/factory";

const components = require("@zflow/components");

export class TransformComponent {
  static description = 'Transform data';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'shuffle') };

  static components = [
    components.transform.Object2Object
  ];

}
