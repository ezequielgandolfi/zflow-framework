import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class StorageComponent extends ComponentType.OkError {
  static icon = "hdd-stack";
}

export class StorageReadFile extends StorageComponent {
  static key = "storage.readfile";
  static description = "Read a data file";
  static shortDescription = "R.File";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}

export class StorageWriteFile extends StorageComponent {
  static key = "storage.writefile";
  static description = "Write a data file";
  static shortDescription = "W.File";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}
