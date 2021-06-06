import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class FunctionComponent extends ComponentType.OkError {
  static icon = "command";
}

export class FunctionLog extends FunctionComponent {
  static key = "function.log";
  static description = "Print a log information";
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
