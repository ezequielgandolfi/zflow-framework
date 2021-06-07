import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class VariableComponent extends ComponentType.Ok {
  static icon = "braces";
}

export class VariableGet extends VariableComponent {
  static key = "variable.get";
  static description = "Get a value";
  static shortDescription = "Get";
  static properties = [
    Property.Id,
    Property.AddReadOnly(Property.Value)
  ];

  id = new ZFlowTypes.DataType.TString();
  value = new ZFlowTypes.DataType.TAny();

  execute() {
    this.value.set(this.$engine.storage.get(this.id.get()));
    this.$output.ok();
  }
}

export class VariableSet extends VariableComponent {
  static key = "variable.set";
  static description = "Set a value";
  static shortDescription = "Set";
  static properties = [
    Property.Id,
    Property.Value
  ];

  id = new ZFlowTypes.DataType.TString();
  value = new ZFlowTypes.DataType.TAny();

  execute() {
    this.$engine.storage.set(this.id.get(), this.value.get());
    this.$output.ok();
  }
}
