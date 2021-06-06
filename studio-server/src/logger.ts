const LOG_PREFIX = '[ZFlow Studio]';

export class Logger {
  static info(data) {
    console.info(LOG_PREFIX, data);
  }
  
  static error(data) {
    console.error(LOG_PREFIX, data);
  }
}

