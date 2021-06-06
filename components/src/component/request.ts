import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class RequestComponent extends ComponentType.OkError {
  static icon = "cloud";
}

export class RequestGet extends RequestComponent {
  static key = "request.get";
  static description = "GET request";
  static shortDescription = "Get";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}
