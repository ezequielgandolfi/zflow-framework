"use strict";

const _ = require("./util");
const Type = require("./type");

const AddReadOnly = BaseClass => {
  var _class, _temp;
  return _temp = _class = class extends BaseClass {}, _.defineProperty(_class, "readOnly", true), _temp;
};
exports.AddReadOnly = AddReadOnly;

const setBaseProps = (obj, key, desc, type) => {
  _.defineProperty(obj, "key", key);
  _.defineProperty(obj, "description", desc);
  _.defineProperty(obj, "type", type);
}

class QueryParameter {}
exports.QueryParameter = QueryParameter;
setBaseProps(QueryParameter, "queryParam", "Query parameter", Type.ZtObject);
// _.defineProperty(QueryParameter, "key", 'queryParam');
// _.defineProperty(QueryParameter, "description", 'Query parameter');
// _.defineProperty(QueryParameter, "type", Type.ZtObject);

class PathParameter {}
exports.PathParameter = PathParameter;
setBaseProps(PathParameter, "pathParam", "Path parameter", Type.ZtObject);
// _.defineProperty(PathParameter, "key", 'pathParam');
// _.defineProperty(PathParameter, "description", 'Path parameter');
// _.defineProperty(PathParameter, "type", Type.ZtObject);

class Payload {}
exports.Payload = Payload;
setBaseProps(Payload, "payload", "Payload", Type.ZtObject);
// _.defineProperty(Payload, "key", 'payload');
// _.defineProperty(Payload, "description", 'Payload');
// _.defineProperty(Payload, "type", Type.ZtObject);

class Milliseconds {}
exports.Milliseconds = Milliseconds;
setBaseProps(Milliseconds, "milliseconds", "Milliseconds", Type.ZtNumber);
// _.defineProperty(Milliseconds, "key", 'milliseconds');
// _.defineProperty(Milliseconds, "description", 'Milliseconds');
// _.defineProperty(Milliseconds, "type", Type.ZtNumber);

class Text {}
exports.Text = Text;
setBaseProps(Text, "text", "Text", Type.ZtString);
// _.defineProperty(Text, "key", 'text');
// _.defineProperty(Text, "description", 'Text');
// _.defineProperty(Text, "type", Type.ZtString);
