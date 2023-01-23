import * as ZFlowTypes from "@zflow/types";

type TOKEN_TYPE = 'undefined' | 'string' | 'number' | 'function' | 'property';

interface IToken {
  expr: string;
  args?: IToken[];
  type: TOKEN_TYPE;
}

interface IProperty {
  component: string;
  property: string;
  childProperty?: string;
}

enum SPECIAL_CHARS  {
  DOWN_LEVEL = "(",
  UP_LEVEL = ")",
  STRING = '"',
  ARGS_SEPARATOR = " ",
  PROP_SEPARATOR = ".",
  FUNCTION_PREFIX = "$"
}

class ScriptFuncions {
  private _engine: ZFlowTypes.Engine.Engine;

  constructor(engine: ZFlowTypes.Engine.Engine) {
    this._engine = engine;
  }

  get(name: string): Function {
    name = name.toUpperCase();
    if (this[name] instanceof Function) {
      return this[name].bind(this);
    }
    return null;
  }

  private value2prop(value: string): IProperty {
    const valueSplit = value.split(SPECIAL_CHARS.PROP_SEPARATOR);
    return { 
      component: valueSplit.length >= 1 ? valueSplit[0] : null,
      property: valueSplit.length >= 2 ? valueSplit[1] : null,
      childProperty: valueSplit.length >= 3 ? valueSplit[2] : null
    };
  }

  protected $SUM(args: any[]): number {
    let result = 0;
    args.forEach(arg => {
      result += parseFloat(arg);
    });
    return result;
  }
  
  protected $CONCAT(args: any[]): string {
    return args.join("");
  }

  protected $(args: any[]): any {
    let result = args?.map(arg => {
      try {
        const prop = this.value2prop(arg);
        if (prop.property) {
          const sourceComponent = this._engine.flow.getStoredComponent(prop.component);
          if (sourceComponent) {
            let sourceProperty = sourceComponent[prop.property];
            if (ZFlowTypes.DataType.isZFlowDataType(sourceProperty)) {
              sourceProperty = sourceProperty.get();
            }
            if (prop.childProperty) {
              return sourceProperty[prop.childProperty];
            }
            return sourceProperty;
          }
        }
        return null;
      }
      catch {
        return null;
      }
    });
    if (result.length === 1) {
      return result[0];
    }
    return result.join(SPECIAL_CHARS.ARGS_SEPARATOR);
  }

  protected $EQ(args: any[]): boolean {
    if (args?.length > 1) {
      let previous = undefined;
      return !args.find(item => {
        let result = false;
        if (previous !== undefined) {
          result = (previous != item)
        }
        previous = item;
        return result;
      });
    }
    return true;
  }

  protected $NE(args: any[]): boolean {
    if (args?.length > 1) {
      return !this.$EQ(args);
    }
    return true;
  }

  protected $GT(args: any[]): boolean {
    return
  }

  protected $GE(args: any[]): boolean {
    return
  }

  protected $LT(args: any[]): boolean {
    return
  }

  protected $LE(args: any[]): boolean {
    return
  }

}

export class ZFlowScript {

  private _engine: ZFlowTypes.Engine.Engine;
  private _scriptFunctions: ScriptFuncions;

  constructor(engine?: ZFlowTypes.Engine.Engine) {
    this._engine = engine;
    this._scriptFunctions = new ScriptFuncions(this._engine);
  }

  private findClosingBraket(exp, start): number {
    let inString = false;
    let level = 0;
  
    for (let iChar = start; iChar < exp.length; iChar++) {
      const char = exp[iChar];
      if (!inString) {
        if (char === SPECIAL_CHARS.DOWN_LEVEL) { level++ }
        else if (char === SPECIAL_CHARS.UP_LEVEL) { level-- }
        if (level < 0) { return iChar }
      }
      if (char === SPECIAL_CHARS.STRING) { inString = !inString }
    }
    return 0;
  }

  private parseTokens(tokens: IToken[]) {
    return tokens.map(token => {
      return this.apply(token.expr, this.parseTokens(token.args));
    });
  }
  
  private apply(token: string, args: any[]): any {
    const tokenFunction = this._scriptFunctions.get(token);
    if (tokenFunction instanceof Function) { 
      return tokenFunction(args);
    }
    if (token.startsWith(SPECIAL_CHARS.STRING) && token.endsWith(SPECIAL_CHARS.STRING)) {
      return token.substring(1, token.length - 1);
    }
    return token;
  }

  private identifyType(expr: string): TOKEN_TYPE {
    const PROPERTY_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.[0-9a-f]+$/i;
    if (expr.startsWith(SPECIAL_CHARS.STRING) && expr.endsWith(SPECIAL_CHARS.STRING)) { return "string" }
    if (expr.startsWith(SPECIAL_CHARS.FUNCTION_PREFIX)) { return "function" }
    if (!isNaN(parseFloat(expr))) { return "number" }
    if (PROPERTY_REGEX.test(expr)) { return "property" }
    return 'undefined';
  }

  tokenize(exp: string): IToken[] {
    let result: IToken[] = [];
    let token: string = "";
    let args: IToken[] = [];
    let inString: boolean = false;
  
    const pushAndReset = () => {
      if (token !== "") {
        result.push({ expr: token, args, type: this.identifyType(token) });
      }
      token = "";
      args = [];
    };
  
    for (let iChar = 0; iChar < exp.length; iChar++) {
      const char = exp[iChar];
      if (char === SPECIAL_CHARS.STRING) {
        if (inString) {
          inString = false;
        }
        else {
          if (token !== "") { throw Error(`Invalid string token position`) }
          inString = true;
        }
        token += char;
      }
      else if (!inString && (char === SPECIAL_CHARS.DOWN_LEVEL)) {
        let lastIndex = this.findClosingBraket(exp, iChar + 1);
        if (lastIndex > iChar) {
          args = [...this.tokenize(exp.substring(iChar + 1, lastIndex))];
          iChar = lastIndex;
          pushAndReset();
        }
        else {
          throw Error(`Invalid token ${char}`);
        }
      }
      else if (!inString && (char === SPECIAL_CHARS.ARGS_SEPARATOR)) {
        pushAndReset();
      }
      else {
        token += char;
      }
    }
    pushAndReset();
    return result;
  }

  untokenize(tokens: IToken[]): string {
    const result = [];
    tokens.forEach(token => {
      if (token.args?.length > 0) {
        result.push(token.expr + SPECIAL_CHARS.DOWN_LEVEL + this.untokenize(token.args) + SPECIAL_CHARS.UP_LEVEL);
      }
      else {
        result.push(token.expr);
      }
    });
    return result.join(SPECIAL_CHARS.ARGS_SEPARATOR);
  }
  
  parse(exp: string): any {
    const tokens = this.tokenize(exp);
    const result = this.parseTokens(tokens);
    if (result.length === 1) {
      return result[0];
    }
    if (result.length === 0) {
      return '';
    }
    return result.join(SPECIAL_CHARS.ARGS_SEPARATOR);
  }

}