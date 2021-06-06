import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class ProcessRun extends ComponentType.OkError {
  static key = "process.run";
  static description = "Execute";
  static shortDescription = "Flow";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}

export class ProcessSetReturn extends ComponentType.OkError {
  static key = "process.return";
  static description = "Set return value";
  static shortDescription = "Return";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}
