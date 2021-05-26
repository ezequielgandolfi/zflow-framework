const LOG_PREFIX = '[ZFlow Engine]';

function info(data) {
  console.info(LOG_PREFIX, data);
}

function error(data) {
  console.error(LOG_PREFIX, data);
}

module.exports = { info, error }
