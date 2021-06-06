import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class VariableComponent extends ComponentType.Ok {
  static icon = "braces";
}

export class VariableSet extends VariableComponent {
  static key = "variable.set";
  static description = "Set a value";
  static shortDescription = "Set";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}
