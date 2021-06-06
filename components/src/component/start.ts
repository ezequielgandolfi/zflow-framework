import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class StartComponent extends ComponentType.Start {
  static icon = "play-circle";
}

export class StartDefault extends StartComponent {
  static key = "start.default";
  static description = "Start process";
  static shortDescription = "Start";
  static properties = [
    Property.AddReadOnly(Property.QueryParameter),
    Property.AddReadOnly(Property.PathParameter),
    Property.AddReadOnly(Property.Payload)
  ];

  queryParam = new ZFlowTypes.DataType.TObject();
  pathParam = new ZFlowTypes.DataType.TObject();
  payload = new ZFlowTypes.DataType.TObject();

  execute() {
    this.$output.ok();
  }
}
