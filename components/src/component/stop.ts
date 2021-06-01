import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class Error extends ComponentType.Ok {
  static key = "error";
  static description = "Stop with error condition";
  static shortDescription = "Error";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}
