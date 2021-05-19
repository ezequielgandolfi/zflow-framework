import { buildNodeI1O2 } from "../../diagram/factory";

const components = require("@zflow/components");

export class DatabaseComponent {
  static description = 'Database';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'server') };

  static components = [
    components.database.Select
  ];

}
