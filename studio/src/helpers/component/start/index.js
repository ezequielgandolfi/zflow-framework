import { NODE_COLOR } from "../../diagram/const";
import { buildNodeO1 } from "../../diagram/factory";

const components = require("@zflow/components/start");

export class StartComponent {
  static hideComponent = true;
  static description = 'Start';

  static diagramNode = ({ data }) => { return buildNodeO1(data, 'play-circle', null, { node: NODE_COLOR.ok }) };

  static components = [
    components.Start
  ];

}
