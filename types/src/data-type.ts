export interface IDataType<T> {
  value: T;
  get(): T;
  set(value: any): void;
}

export function isZFlowDataType(object: any): object is IDataType<any> {
  return (!!object)
      && (object instanceof Object)
      && ("value" in object)
      && ("get" in object)
      && ("set" in object);
}


export class TObject implements IDataType<any> {
  static key = "object";

  value: any = null;
  get(): any {
    return this.value;
  }
  set(value: any) {
    try {
      if (value instanceof Object) {
        this.value = value;
      }
      else {
        this.value = JSON.parse(value);
      }
    }
    catch {
      this.value = { };
    }
  }
}

export class TNumber implements IDataType<number> {
  static key = "number";

  value: number = null;
  get(): number {
    return this.value;
  }
  set(value: any) {
    try {
      if (!isNaN(value)) {
        this.value = value;
      }
      else {
        this.value = parseInt(value);
      }
    }
    catch {
      this.value = 0;
    }
  }
}

export class TString implements IDataType<string> {
  static key = "string";

  value: string = null;
  get(): string {
    return this.value;
  }
  set(value: any) {
    try {
      this.value = '' + value;
    }
    catch {
      this.value = '';
    }
  }
}

export class TAny implements IDataType<any> {
  static key = "any";

  value: any = null;
  get(): any {
    return this.value;
  }
  set(value: any) {
    try {
      if (value instanceof Object) {
        this.value = value;
      }
      else {
        this.value = JSON.parse(value);
      }
    }
    catch {
      this.value = { };
    }
  }
}