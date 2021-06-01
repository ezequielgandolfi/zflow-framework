import { buildNodeI1O2 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class RequestComponent {
  static description = 'Request';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'cloud') };

  static components = [
    ZFlowComponents.Component.request.Get
  ];

}
