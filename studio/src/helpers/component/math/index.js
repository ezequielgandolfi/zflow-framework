import { buildNodeI1O2 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class MathComponent {
  static description = 'Math';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'percent') };

  static components = [
    ZFlowComponents.Component.math.Sum
  ];

}
