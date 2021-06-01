import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class Sum extends ComponentType.OkError {
  static key = "sum";
  static description = "Sum values";
  static shortDescription = "Sum";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}
