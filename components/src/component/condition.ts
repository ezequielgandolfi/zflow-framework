import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class All extends ComponentType.Condition {
  static key = "all";
  static description = "All conditions must be valid";
  static shortDescription = "All";
  static properties = [
  ];

  execute() {
    this.true();
  }
}

export class Any extends ComponentType.Condition {
  static key = "any";
  static description = "Any condition must be valid";
  static shortDescription = "Any";
  static properties = [
  ];

  execute() {
    this.true();
  }
}
