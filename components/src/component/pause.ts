import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class PauseDelay extends ComponentType.Ok {
  static key = "pause.delay";
  static description = "Delay a certain amount of time";
  static shortDescription = "Delay";
  static properties = [
    Property.Milliseconds
  ];

  milliseconds = new ZFlowTypes.DataType.TNumber();

  execute() {
    this.$output.ok();
  }
}
