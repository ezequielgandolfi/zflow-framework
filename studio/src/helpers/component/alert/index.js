import { buildNodeI1O1 } from "../../diagram/factory";

const components = require("@zflow/components/alert");

// class AlertComponent_Force {
//   static key = 'force'
//   static description = 'Force alert condition';
//   static shortDescription = 'Force';

//   static properties = [];
// }

export class AlertComponent {
  static description = 'Alert';
  static diagramNode = ({ data }) => { return buildNodeI1O1(data, 'bell') };

  static components = [
    components.AlertComponent_Force
  ];

}
