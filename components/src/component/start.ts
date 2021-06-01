import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class Start extends ComponentType.Ok {
  static key = "trigger";
  static description = "Triggered start";
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
    this.ok();
  }
}
