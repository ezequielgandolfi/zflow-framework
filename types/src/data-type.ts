export interface IDataType<T> {
  value: T;
  get(): T;
  set(value: any): void;
}

export function isZFlowDataType(object: any): object is IDataType<any> {
  return (!!object) && (object['get'] instanceof Function) && (object['set'] instanceof Function);
}

class TDataType<T> implements IDataType<T> {
  static key = "";
  value: T = this.default();

  get(): T {
    return this.value;
  }

  set(value: any) {
    try {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          this.value = this.mapItem(value[0]);
        }
        else {
          this.value = this.default();
        }
      }
      else {
        this.value = this.mapItem(value);
      }
    }
    catch {
      this.value = this.default();
    }
  }

  protected default(): T {
    return null;
  }

  protected mapItem(value: any): T {
    return null;
  }
}

export class TObject extends TDataType<any> {
  static key = "object";

  protected default(): any {
    return { };
  }

  protected mapItem(value: any): any {
    if (value instanceof Object) {
      return JSON.parse(JSON.stringify(value));
    }
    else {
      return JSON.parse(value);
    }
  }
}

export class TNumber extends TDataType<number> {
  static key = "number";

  protected default(): number {
    return 0;
  }

  protected mapItem(value: any): number {
    if (typeof(value) === "number") {
      return value;
    }
    else {
      return parseFloat(value);
    }
  }
}

export class TString extends TDataType<string> {
  static key = "string";

  protected default(): string {
    return "";
  }

  protected mapItem(value: any): string {
    return "" + value;
  }
}

export class TBoolean extends TDataType<boolean> {
  static key = "boolean";

  protected default(): boolean {
    return false;
  }

  protected mapItem(value: any): boolean {
    return !!value;
  }
}

export class TAny extends TDataType<any> {
  static key = "any";

  protected default(): any {
    return { };
  }

  protected mapItem(value: any): any {
    if (value instanceof Object) {
      return JSON.parse(JSON.stringify(value));
    }
    else {
      return value;
    }
  }
}

class TArrayType<T> extends TDataType<Array<T>> {
  static key = "array";

  value: Array<T> = this.default();

  get(): Array<T> { 
    return this.value;
  };

  set(value: any) {
    let result = this.default();
    if (value) {
      if (Array.isArray(value)) {
        result.push(...value.map(item => {
          try {
            return this.mapItem(item);
          }
          catch {
            return this.defaultItem();
          }
        }));
      }
      else {
        try {
          result.push(this.mapItem(value));
        }
        catch { }
      }
    }
    this.value = result;
  };

  protected default(): Array<T> {
    return [];
  }

  protected defaultItem(): T {
    return;
  }

  protected mapItem(value: any) {
    return value;
  }
}

export class TBooleanArray extends TArrayType<boolean> {
  static key = "boolean-array";

  protected defaultItem(): boolean {
    return false;
  }

  protected mapItem(value: any): boolean {
    return !!value;
  }
}

export class TNumberArray extends TArrayType<number> {
  static key = "number-array";

  protected defaultItem(): number {
    return 0;
  }

  protected mapItem(value: any): number {
    if (typeof(value) === "number") {
      return value;
    }
    else {
      return parseFloat(value);
    }
  }
}

export class TStringArray extends TArrayType<string> {
  static key = "string-array";

  protected defaultItem(): string {
    return "";
  }

  protected mapItem(value: any): string {
    return "" + value;
  }
}

export class TObjectArray extends TArrayType<any> {
  static key = "object-array";

  protected defaultItem(): any {
    return { };
  }

  protected mapItem(value: any): any {
    if (value instanceof Object) {
      return JSON.parse(JSON.stringify(value));
    }
    else {
      return JSON.parse(value);
    }
  }
}

export class TAnyArray extends TArrayType<any> {
  static key = "any-array";

  protected defaultItem(): any {
    return { };
  }

  protected mapItem(value: any): any {
    if (value instanceof Object) {
      return JSON.parse(JSON.stringify(value));
    }
    else {
      return JSON.parse(value);
    }
  }
}
