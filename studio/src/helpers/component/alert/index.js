import { buildNodeI1O1 } from "../../diagram/factory";

const components = require("@zflow/components");

export class AlertComponent {
  static description = 'Alert';
  static diagramNode = ({ data }) => { return buildNodeI1O1(data, 'bell') };

  static components = [
    components.alert.Force
  ];

}
