import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class MathComponent extends ComponentType.OkError {
  static icon = "percent";
}

export class MathSum extends MathComponent {
  static key = "math.sum";
  static description = "Sum values";
  static shortDescription = "Sum";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}
