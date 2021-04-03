import { Type_Number, Type_Object } from "./type";

export const AddReadOnly = BaseClass => class extends BaseClass {
  static readOnly = true;
}

export class Property_QueryParameter {
  static key = 'queryParam';
  static description = 'Query parameter';
  static type = Type_Object;
}

export class Property_PathParameter {
  static key = 'pathParam';
  static description = 'Path parameter';
  static type = Type_Object;
}

export class Property_Payload {
  static key = 'payload';
  static description = 'Payload';
  static type = Type_Object;
}

export class Property_Milliseconds {
  static key = 'milliseconds';
  static description = 'Milliseconds';
  static type = Type_Number;
}