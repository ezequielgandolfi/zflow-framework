import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class Get extends ComponentType.OkError {
  static key = "get";
  static description = "GET request";
  static shortDescription = "Get";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}
