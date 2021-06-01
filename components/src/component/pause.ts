import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class Delay extends ComponentType.Ok {
  static key = "delay";
  static description = "Delay a certain amount of time";
  static shortDescription = "Delay";
  static properties = [
    Property.Milliseconds
  ];

  milliseconds = new ZFlowTypes.DataType.TNumber();

  execute() {
    this.ok();
  }
}
