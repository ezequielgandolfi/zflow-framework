import { buildNodeI1O1 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class VariableComponent {
  static description = 'Variable';
  static diagramNode = ({ data }) => { return buildNodeI1O1(data, 'braces') };

  static components = [
    ZFlowComponents.Component.variable.Set
  ];

}
