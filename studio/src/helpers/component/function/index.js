import { buildNodeI1O2 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class FunctionComponent {
  static description = 'Function';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'command') };

  static components = [
    ZFlowComponents.Component.function.Log
  ];

}
