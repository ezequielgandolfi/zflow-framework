import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class Force extends ComponentType.Ok {
  static key = "force";
  static description = "Force alert condition";
  static shortDescription = "Force";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}
