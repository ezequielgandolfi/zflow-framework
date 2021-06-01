import { buildNodeI1O2 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class StorageComponent {
  static description = 'Storage';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'hdd-stack') };

  static components = [
    ZFlowComponents.Component.storage.ReadFile,
    ZFlowComponents.Component.storage.WriteFile
  ];

}
