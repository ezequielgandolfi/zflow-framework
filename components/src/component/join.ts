import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class First extends ComponentType.OkError {
  static key = "first";
  static description = "Go on first event";
  static shortDescription = "First";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}

export class All extends ComponentType.OkError {
  static key = "all";
  static description = "Wait all events";
  static shortDescription = "All";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}
