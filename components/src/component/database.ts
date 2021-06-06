import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class DatabaseComponent extends ComponentType.OkError {
  static icon = "server";
}

export class DatabaseFindOne extends DatabaseComponent {
  static key = "database.findone";
  static description = "Find one record";
  static shortDescription = "Find 1";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}

export class DatabaseFindMany extends DatabaseComponent {
  static key = "database.findmany";
  static description = "Find many records";
  static shortDescription = "Find []";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}
