import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class ConditionComponent extends ComponentType.Condition {
  static icon = "stoplights";
}

export class ConditionAll extends ConditionComponent {
  static key = "condition.all";
  static description = "All conditions must be valid";
  static shortDescription = "All";
  static properties = [
    Property.Conditions
  ];

  conditions = new ZFlowTypes.DataType.TBooleanArray();

  execute() {
    if (this.conditions.get().find(condition => !condition)) {
      this.$output.false();
    }
    else {
      this.$output.true();  
    }
  }
}

export class ConditionAny extends ConditionComponent {
  static key = "condition.any";
  static description = "Any condition must be valid";
  static shortDescription = "Any";
  static properties = [
    Property.Conditions
  ];

  conditions = new ZFlowTypes.DataType.TBooleanArray();

  execute() {
    if ((this.conditions.get().length === 0) || (this.conditions.get().find(condition => condition))) {
      this.$output.true();
    }
    else {
      this.$output.false();  
    }
  }
}
