import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class StopComponent extends ComponentType.Stop {
  static icon = "exclamation-octagon";
}

export class StopError extends StopComponent {
  static key = "stop.error";
  static description = "Stop with error condition";
  static shortDescription = "Error";
  static properties = [
  ];

  execute() {
    this.$output.error();
  }
}
