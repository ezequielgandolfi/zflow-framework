import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class VariableSet extends ComponentType.Ok {
  static key = "variable.set";
  static description = "Set a value";
  static shortDescription = "Set";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}
