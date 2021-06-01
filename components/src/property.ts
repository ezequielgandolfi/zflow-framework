import * as ZFlowTypes from "@zflow/types";

export const AddReadOnly = (BaseClass) => {
  return class extends BaseClass {
    static readonly = true;
  }
}



export class QueryParameter {
  static key = "queryParam";
  static description = "Query parameters";
  static type = ZFlowTypes.DataType.TObject;
}

export class PathParameter {
  static key = "pathParam";
  static description = "Path parameters";
  static type = ZFlowTypes.DataType.TObject;
}

export class Payload {
  static key = "payload";
  static description = "Payload";
  static type = ZFlowTypes.DataType.TObject;
}

export class Milliseconds {
  static key = "milliseconds";
  static description = "Milliseconds";
  static type = ZFlowTypes.DataType.TNumber;
}

export class Text {
  static key = "text";
  static description = "Text";
  static type = ZFlowTypes.DataType.TString;
}

export class Value {
  static key = "value";
  static description = "Value";
  static type = ZFlowTypes.DataType.TAny;
}

export class FromNumber {
  static key = "from";
  static description = "From";
  static type = ZFlowTypes.DataType.TNumber;
}

export class ToNumber {
  static key = "to";
  static description = "To";
  static type = ZFlowTypes.DataType.TNumber;
}

export class CurrentNumber {
  static key = "current";
  static description = "Current";
  static type = ZFlowTypes.DataType.TNumber;
}
