import { buildNodeI1O2 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class TransformComponent {
  static description = 'Transform data';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'shuffle') };

  static components = [
    ZFlowComponents.Component.transform.Object2Object
  ];

}
