import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class AlertComponent extends ComponentType.Ok {
  static icon = "bell";
}

export class AlertForce extends AlertComponent {
  static key = "alert.force";
  static description = "Force alert condition";
  static shortDescription = "Force";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}
