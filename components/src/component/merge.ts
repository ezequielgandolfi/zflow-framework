import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class Lists extends ComponentType.OkError {
  static key = "lists";
  static description = "Merge list items";
  static shortDescription = "Lists";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}
