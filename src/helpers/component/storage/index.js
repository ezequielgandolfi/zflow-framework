import { buildNodeI1O2 } from "../../diagram/factory";

class StorageComponent_ReadFile {
  static key = 'readfile'
  static description = 'Read a data file';
  static shortDescription = 'Read file';

  static properties = [];
}

export class StorageComponent {
  static description = 'Storage';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'hdd-stack') };

  static components = [
    StorageComponent_ReadFile
  ];

}
