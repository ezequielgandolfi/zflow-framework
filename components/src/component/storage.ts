import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class ReadFile extends ComponentType.OkError {
  static key = "readfile";
  static description = "Read a data file";
  static shortDescription = "R.File";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}

export class WriteFile extends ComponentType.OkError {
  static key = "writefile";
  static description = "Write a data file";
  static shortDescription = "W.File";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}
