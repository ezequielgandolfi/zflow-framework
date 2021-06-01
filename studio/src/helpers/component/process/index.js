import { buildNodeI1O2 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class ProcessComponent {
  static description = 'Process';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'cpu') };

  static components = [
    ZFlowComponents.Component.process.Flow
  ];

}
