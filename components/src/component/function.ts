import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class FunctionLog extends ComponentType.OkError {
  static key = "function.log";
  static description = "Log";
  static shortDescription = "Log";
  static properties = [
    Property.Text
  ];

  text = new ZFlowTypes.DataType.TString();

  execute() {
    console.log(this.text.get());
    this.$output.ok();
  }
}
