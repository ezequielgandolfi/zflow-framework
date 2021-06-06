import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class AlertForce extends ComponentType.Ok {
  static key = "alert.force";
  static description = "Force alert condition";
  static shortDescription = "Force";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}
