import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class Flow extends ComponentType.OkError {
  static key = "flow";
  static description = "Execute";
  static shortDescription = "Flow";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}

export class SetReturn extends ComponentType.OkError {
  static key = "return";
  static description = "Set return value";
  static shortDescription = "Return";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}
