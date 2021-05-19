import { buildNodeI1O2 } from "../../diagram/factory";

const components = require("@zflow/components/request");

export class RequestComponent {
  static description = 'Request';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'cloud') };

  static components = [
    components.Get
  ];

}
