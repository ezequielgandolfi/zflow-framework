import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class TransformComponent extends ComponentType.OkError {
  static icon = "shuffle";
}

export class TransformObject2Object extends TransformComponent {
  static key = "transform.o2o";
  static description = "Object to object";
  static shortDescription = "Obj>Obj";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}
