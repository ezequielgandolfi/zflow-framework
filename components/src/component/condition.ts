import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class ConditionAll extends ComponentType.Condition {
  static key = "condition.all";
  static description = "All conditions must be valid";
  static shortDescription = "All";
  static properties = [
  ];

  execute() {
    this.$output.true();
  }
}

export class ConditionAny extends ComponentType.Condition {
  static key = "condition.any";
  static description = "Any condition must be valid";
  static shortDescription = "Any";
  static properties = [
  ];

  execute() {
    this.$output.true();
  }
}
