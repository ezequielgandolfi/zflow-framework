const LOG_PREFIX = '[ZFlow Engine]';

export function info(data) {
  console.info(LOG_PREFIX, data);
}

export function error(data) {
  console.error(LOG_PREFIX, data);
}
