import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class Set extends ComponentType.Ok {
  static key = "set";
  static description = "Set a value";
  static shortDescription = "Set";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}
