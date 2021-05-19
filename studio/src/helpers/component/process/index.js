import { buildNodeI1O2 } from "../../diagram/factory";

const components = require("@zflow/components/process");

export class ProcessComponent {
  static description = 'Process';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'cpu') };

  static components = [
    components.Flow
  ];

}
