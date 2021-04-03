/**
 * Resolve promises on payload
 */

export function promiseResolverMiddleware() {
  return (next) => {
    return (action) => {
      if (action.payload instanceof Promise) {
        action.payload
          .then(data => {
            action.payload = data;
            next(action);
          })
          .catch(err => {
            action.payload = err;
            next(action);
          });
        return;
      }
      else {
        return next(action);
      }
    }
  }
}
