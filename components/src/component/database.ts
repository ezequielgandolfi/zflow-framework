import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class FindOne extends ComponentType.OkError {
  static key = "findone";
  static description = "Find one";
  static shortDescription = "Find 1";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}

export class FindMany extends ComponentType.OkError {
  static key = "findmany";
  static description = "Find many";
  static shortDescription = "Find []";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}
