import { buildNodeI1O1 } from "../../diagram/factory";

const components = require("@zflow/components/pause");

export class PauseComponent {
  static description = 'Pause';
  static diagramNode = ({ data }) => { return buildNodeI1O1(data, 'clock') };

  static components = [
    components.Delay
  ];

}
