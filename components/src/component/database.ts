import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class DatabaseFindOne extends ComponentType.OkError {
  static key = "database.findone";
  static description = "Find one";
  static shortDescription = "Find 1";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}

export class DatabaseFindMany extends ComponentType.OkError {
  static key = "database.findmany";
  static description = "Find many";
  static shortDescription = "Find []";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}
