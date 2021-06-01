import { NODE_COLOR } from "../../diagram/const";
import { buildNodeO1 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class StartComponent {
  static hideComponent = true;
  static description = 'Start';

  static diagramNode = ({ data }) => { return buildNodeO1(data, 'play-circle', null, { node: NODE_COLOR.ok }) };

  static components = [
    ZFlowComponents.Component.start.Start
  ];

}
