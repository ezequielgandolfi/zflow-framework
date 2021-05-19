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

class ZtNumber {}
exports.ZtNumber = ZtNumber;
setBaseProps(ZtNumber, "number", "0");

class ZtString {}
exports.ZtString = ZtString;
setBaseProps(ZtString, "string", "");
