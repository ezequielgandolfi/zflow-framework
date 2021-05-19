import { buildNodeI1O2 } from "../../diagram/factory";

class StorageComponent_ReadFile {
  static key = 'readfile'
  static description = 'Read a data file';
  static shortDescription = 'R.File';

  static properties = [];
}

class StorageComponent_WriteFile {
  static key = 'writefile'
  static description = 'Write a data file';
  static shortDescription = 'W.File';

  static properties = [];
}

export class StorageComponent {
  static description = 'Storage';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'hdd-stack') };

  static components = [
    StorageComponent_ReadFile,
    StorageComponent_WriteFile
  ];

}
