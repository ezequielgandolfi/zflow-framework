function _defineProperty (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  }
  else {
    obj[key] = value;
  }
  return obj;
}

function _defineProperties (obj, props) {
  Object.keys(props).forEach(key => {
    _defineProperty(obj, key, props[key]);
  });
  return obj;
}


module.exports = {
  defineProperty: _defineProperty,
  defineProperties: _defineProperties
}
