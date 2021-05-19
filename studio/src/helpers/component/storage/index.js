import { buildNodeI1O2 } from "../../diagram/factory";

const components = require("@zflow/components");

export class StorageComponent {
  static description = 'Storage';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'hdd-stack') };

  static components = [
    components.storage.ReadFile,
    components.storage.WriteFile
  ];

}
