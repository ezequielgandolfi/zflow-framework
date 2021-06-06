import * as ZFlowTypes from "@zflow/types";

export const AddReadOnly = (BaseClass) => {
  return class extends BaseClass {
    static readOnly = true;
  }
}

export abstract class AbstractProperty {
  static key: string;
  static description: string;
  static type: any;
}


export class QueryParameter extends AbstractProperty {
  static key = "queryParam";
  static description = "Query parameters";
  static type = ZFlowTypes.DataType.TObject;
}

export class PathParameter extends AbstractProperty {
  static key = "pathParam";
  static description = "Path parameters";
  static type = ZFlowTypes.DataType.TObject;
}

export class Payload extends AbstractProperty {
  static key = "payload";
  static description = "Payload";
  static type = ZFlowTypes.DataType.TObject;
}

export class Milliseconds extends AbstractProperty {
  static key = "milliseconds";
  static description = "Milliseconds";
  static type = ZFlowTypes.DataType.TNumber;
}

export class Text extends AbstractProperty {
  static key = "text";
  static description = "Text";
  static type = ZFlowTypes.DataType.TString;
}

export class Value extends AbstractProperty {
  static key = "value";
  static description = "Value";
  static type = ZFlowTypes.DataType.TAny;
}

export class FromNumber extends AbstractProperty {
  static key = "from";
  static description = "From";
  static type = ZFlowTypes.DataType.TNumber;
}

export class ToNumber extends AbstractProperty {
  static key = "to";
  static description = "To";
  static type = ZFlowTypes.DataType.TNumber;
}

export class CurrentNumber extends AbstractProperty {
  static key = "current";
  static description = "Current";
  static type = ZFlowTypes.DataType.TNumber;
}
