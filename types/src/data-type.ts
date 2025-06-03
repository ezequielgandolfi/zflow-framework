export interface DataType<T> {
  value: T;
  get(): T;
  set(value: unknown): void;
}

export function isZFlowDataType(object: unknown): object is DataType<unknown> {
  return (!!object) && (object['get'] instanceof Function) && (object['set'] instanceof Function);
}

class AbstractDataType<T> implements DataType<T> {
  static key = '';
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

  protected isEqual(value: any): boolean {
    if (typeof value === 'object') {
      if ('get' in value) {
        return JSON.stringify(this.get()) === JSON.stringify(value.get());
      }
    }
    return false;
  }
}

export class Data extends AbstractDataType<any> {
  static key = 'object';

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

export class Number extends AbstractDataType<number> {
  static key = 'number';

  protected default(): number {
    return 0;
  }

  protected mapItem(value: any): number {
    if (typeof(value) === 'number') {
      return value;
    }
    else {
      return parseFloat(value);
    }
  }
}

export class String extends AbstractDataType<string> {
  static key = 'string';

  protected default(): string {
    return '';
  }

  protected mapItem(value: any): string {
    return '' + value;
  }
}

export class Boolean extends AbstractDataType<boolean> {
  static key = 'boolean';

  protected default(): boolean {
    return false;
  }

  protected mapItem(value: any): boolean {
    return !!value;
  }
}

export class Any extends AbstractDataType<any> {
  static key = 'any';

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

class ArrayType<T> extends AbstractDataType<T[]> {
  static key = 'array';

  value: T[] = this.default();

  get(): T[] { 
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

  protected default(): T[] {
    return [];
  }

  protected defaultItem(): T {
    return;
  }

  protected mapItem(value: any) {
    return value;
  }
}

export class BooleanArray extends ArrayType<boolean> {
  static key = 'boolean-array';

  protected defaultItem(): boolean {
    return false;
  }

  protected mapItem(value: any): boolean {
    return !!value;
  }
}

export class NumberArray extends ArrayType<number> {
  static key = 'number-array';

  protected defaultItem(): number {
    return 0;
  }

  protected mapItem(value: any): number {
    if (typeof(value) === 'number') {
      return value;
    }
    else {
      return parseFloat(value);
    }
  }
}

export class StringArray extends ArrayType<string> {
  static key = 'string-array';

  protected defaultItem(): string {
    return '';
  }

  protected mapItem(value: any): string {
    return '' + value;
  }
}

export class DataArray extends ArrayType<any> {
  static key = 'object-array';

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

export class AnyArray extends ArrayType<any> {
  static key = 'any-array';

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
