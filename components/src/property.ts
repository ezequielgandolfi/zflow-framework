import * as ZFlowTypes from "@zflow/types";

export const AddReadOnly = (BaseClass) => {
  return class extends BaseClass {
    static readOnly = true;
  }
}

export const AddIsArray = (BaseClass) => {
  return class extends BaseClass {
    static isArray = true;
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
  static type = ZFlowTypes.DataType.Data;
}

export class PathParameter extends AbstractProperty {
  static key = "pathParam";
  static description = "Path parameters";
  static type = ZFlowTypes.DataType.Data;
}

export class Payload extends AbstractProperty {
  static key = "payload";
  static description = "Payload";
  static type = ZFlowTypes.DataType.Data;
}

export class Milliseconds extends AbstractProperty {
  static key = "milliseconds";
  static description = "Milliseconds";
  static type = ZFlowTypes.DataType.Number;
}

export class Text extends AbstractProperty {
  static key = "text";
  static description = "Text";
  static type = ZFlowTypes.DataType.String;
}

export class Value extends AbstractProperty {
  static key = "value";
  static description = "Value";
  static type = ZFlowTypes.DataType.Any;
}

export class FromNumber extends AbstractProperty {
  static key = "from";
  static description = "From";
  static type = ZFlowTypes.DataType.Number;
}

export class ToNumber extends AbstractProperty {
  static key = "to";
  static description = "To";
  static type = ZFlowTypes.DataType.Number;
}

export class CurrentNumber extends AbstractProperty {
  static key = "current";
  static description = "Current";
  static type = ZFlowTypes.DataType.Number;
}

export class Id extends AbstractProperty {
  static key = "id";
  static description = "ID";
  static type = ZFlowTypes.DataType.String;
}

export class Conditions extends AbstractProperty {
  static key = "conditions";
  static description = "Conditions";
  static type = ZFlowTypes.DataType.BooleanArray;
}