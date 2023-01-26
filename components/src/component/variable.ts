import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class VariableComponent extends ComponentType.Ok {
  static icon = "braces";
}

export class VariableGet extends VariableComponent {
  static key = "variable.get";
  static description = "Get a global value";
  static shortDescription = "Get";
  static properties = [
    Property.Id,
    Property.AddReadOnly(Property.Value)
  ];

  id = new ZFlowTypes.DataType.String();
  value = new ZFlowTypes.DataType.Any();

  execute() {
    this.value.set(this.$engine.storage.get(this.id.get()));
    this.$output.ok();
  }
}

export class VariableSet extends VariableComponent {
  static key = "variable.set";
  static description = "Set a global value";
  static shortDescription = "Set";
  static properties = [
    Property.Id,
    Property.Value
  ];

  id = new ZFlowTypes.DataType.String();
  value = new ZFlowTypes.DataType.Any();

  execute() {
    this.$engine.storage.set(this.id.get(), this.value.get());
    this.$output.ok();
  }
}

export class LocalVariableGet extends VariableComponent {
  static key = "variable.local.get";
  static description = "Get a local value";
  static shortDescription = "Local Get";
  static properties = [
    Property.Id,
    Property.AddReadOnly(Property.Value)
  ];

  id = new ZFlowTypes.DataType.String();
  value = new ZFlowTypes.DataType.Any();

  execute() {
    this.value.set(this.$engine.flow.sessionStorage.get(this.id.get()));
    this.$output.ok();
  }
}

export class LocalVariableSet extends VariableComponent {
  static key = "variable.local.set";
  static description = "Set a local value";
  static shortDescription = "Local Set";
  static properties = [
    Property.Id,
    Property.Value
  ];

  id = new ZFlowTypes.DataType.String();
  value = new ZFlowTypes.DataType.Any();

  execute() {
    this.$engine.flow.sessionStorage.set(this.id.get(), this.value.get());
    this.$output.ok();
  }
}
