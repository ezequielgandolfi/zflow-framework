"use strict";

const _ = require("../util");
const property = require("../property");

class Log {}
exports.Log = Log;
_.setComponentBasicProps(Log, "log", "Log", "Log", [
  property.Text
]);
