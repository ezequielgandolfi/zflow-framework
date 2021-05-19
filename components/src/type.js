"use strict";

const _ = require("./util");

const setBaseProps = (obj, key, def) => {
  _.defineProperties(obj, {
    key: key,
    default: def
  });
}

class ZtObject {}
exports.ZtObject = ZtObject;
setBaseProps(ZtObject, "object", "");
// _.defineProperty(ZtObject, "key", "object");
// _.defineProperty(ZtObject, "default", "");

class ZtNumber {}
exports.ZtNumber = ZtNumber;
setBaseProps(ZtNumber, "number", "0");
// _.defineProperty(ZtNumber, "key", "number");
// _.defineProperty(ZtNumber, "default", "0");

class ZtString {}
exports.ZtString = ZtString;
setBaseProps(ZtString, "string", "");
// _.defineProperty(ZtString, "key", "string");
// _.defineProperty(ZtString, "default", "");
