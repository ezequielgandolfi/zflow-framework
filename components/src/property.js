"use strict";

const _ = require("./util");
const Type = require("./type");

const setBaseProps = (obj, key, desc, type) => {
  _.defineProperties(obj, {
    key: key,
    description: desc,
    type: type
  });
}

const AddReadOnly = BaseClass => {
  var _class, _temp;
  return _temp = _class = class extends BaseClass {}, _.defineProperty(_class, "readOnly", true), _temp;
};
exports.AddReadOnly = AddReadOnly;

class QueryParameter {}
exports.QueryParameter = QueryParameter;
setBaseProps(QueryParameter, "queryParam", "Query parameter", Type.ZtObject);

class PathParameter {}
exports.PathParameter = PathParameter;
setBaseProps(PathParameter, "pathParam", "Path parameter", Type.ZtObject);

class Payload {}
exports.Payload = Payload;
setBaseProps(Payload, "payload", "Payload", Type.ZtObject);

class Milliseconds {}
exports.Milliseconds = Milliseconds;
setBaseProps(Milliseconds, "milliseconds", "Milliseconds", Type.ZtNumber);

class Text {}
exports.Text = Text;
setBaseProps(Text, "text", "Text", Type.ZtString);
