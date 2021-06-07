interface IToken {
  expr: string;
  args?: IToken[];
}


enum SPECIAL_CHARS  {
  DOWN_LEVEL = "(",
  UP_LEVEL = ")",
  STRING = '"',
  ARGS_SEPARATOR = " "
}


class ScriptFuncions {
  $SUM(args: any[]): number {
    let result = 0;
    args.forEach(arg => {
      result += parseFloat(arg);
    });
    return result;
  }
  
  $CONCAT(args: any[]): string {
    return args.join("");
  }
}

export class ZFlowScript {

  private scriptFunctions = new ScriptFuncions();

  private tokens(exp: string): IToken[] {
    let result: IToken[] = [];
    let token: string = "";
    let args: IToken[] = [];
    let inString: boolean = false;
  
    const pushAndReset = () => {
      if (token !== "") {
        result.push({ expr: token, args });
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
          args = [...this.tokens(exp.substring(iChar + 1, lastIndex))];
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
    const tokenFunction = this.scriptFunctions[token.toUpperCase()];
    if (tokenFunction instanceof Function) { 
      return tokenFunction(args);
    }
    if (token.startsWith(SPECIAL_CHARS.STRING) && token.endsWith(SPECIAL_CHARS.STRING)) {
      return token.substring(1, token.length - 1);
    }
    return token;
  }
  
  parse(exp: string): any {
    const tokens = this.tokens(exp);
    const result = this.parseTokens(tokens);
    if ((result) && (result.length === 1)) {
      return result[0];
    }
    return result;
  }

}