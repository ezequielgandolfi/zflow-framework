import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class Object2Object extends ComponentType.OkError {
  static key = "o2o";
  static description = "Object to object";
  static shortDescription = "Obj>Obj";
  static properties = [
  ];

  execute() {
    this.ok();
  }
}
