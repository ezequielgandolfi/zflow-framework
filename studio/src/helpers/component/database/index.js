import { buildNodeI1O2 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class DatabaseComponent {
  static description = 'Database';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'server') };

  static components = [
    ZFlowComponents.Component.database.FindOne,
    ZFlowComponents.Component.database.FindMany,
  ];

}
