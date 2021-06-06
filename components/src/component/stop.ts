import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class StopError extends ComponentType.Stop {
  static key = "stop.error";
  static description = "Stop with error condition";
  static shortDescription = "Error";
  static properties = [
  ];

  execute() {
    this.$output.error();
  }
}
