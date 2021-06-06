import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class StorageReadFile extends ComponentType.OkError {
  static key = "storage.readfile";
  static description = "Read a data file";
  static shortDescription = "R.File";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}

export class StorageWriteFile extends ComponentType.OkError {
  static key = "storage.writefile";
  static description = "Write a data file";
  static shortDescription = "W.File";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}
