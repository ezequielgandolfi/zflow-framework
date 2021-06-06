import * as fs from "fs";
import * as path from "path";

interface IDatabase {
  uri?: string;
}

interface IEnvironmentConfiguration {
  database?: IDatabase;
}

export class Config {

  private _defaultEnvironmentName = 'development';
  private _environmentName = process.env.NODE_ENV || this._defaultEnvironmentName;
  private _environmentConfig: IEnvironmentConfiguration = { };

  constructor() {
    this.loadConfig();
  }

  private getConfigFileName() {
    return path.join(__dirname, process.env.CONFIG || 'config.json');
  }

  private loadConfig() {
    const configFile = JSON.parse(fs.readFileSync(this.getConfigFileName(), 'utf8'));
    this._environmentConfig = configFile[this._defaultEnvironmentName];
    if (this._environmentName !== this._defaultEnvironmentName) {
      Object.assign(this._environmentConfig, configFile[this._environmentName])
    }
  }

  get env() {
    return this._environmentConfig;
  }
}