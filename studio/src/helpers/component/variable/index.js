import { buildNodeI1O1 } from "../../diagram/factory";

const components = require("@zflow/components/variable");

export class VariableComponent {
  static description = 'Variable';
  static diagramNode = ({ data }) => { return buildNodeI1O1(data, 'braces') };

  static components = [
    components.Set
  ];

}
