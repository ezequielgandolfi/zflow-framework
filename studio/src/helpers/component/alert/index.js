import { buildNodeI1O1 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class AlertComponent {
  static description = 'Alert';
  static diagramNode = ({ data }) => { return buildNodeI1O1(data, 'bell') };

  static components = [
    ZFlowComponents.Component.alert.Force
  ];

}
