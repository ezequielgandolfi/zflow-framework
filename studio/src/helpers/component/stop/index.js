import { HANDLE_COLOR, NODE_COLOR } from "../../diagram/const";
import { buildNodeI1 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class StopComponent {
  static description = 'Stop';
  static diagramNode = ({ data }) => { return buildNodeI1(data, 'exclamation-octagon', null, { input1: HANDLE_COLOR.error, node: NODE_COLOR.error }) };

  static components = [
    ZFlowComponents.Component.stop.Error
  ];

}
