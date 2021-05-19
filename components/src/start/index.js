"use strict";

const _ = require("../util");
const property = require("../property");

class Start {}
exports.Start = Start;
_.setComponentBasicProps(Start, "trigger", "Triggered start", "Start", [
  property.AddReadOnly(property.QueryParameter),
  property.AddReadOnly(property.PathParameter),
  property.AddReadOnly(property.Payload)
]);
