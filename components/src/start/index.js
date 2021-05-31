"use strict";

const _ = require("../util");
const property = require("../property");
const component = require("../component");

class Start extends component.Ok {
  execute() {
    this.ok();
  }
}
exports.Start = Start;
_.setComponentBasicProps(Start, "trigger", "Triggered start", "Start", [
  property.AddReadOnly(property.QueryParameter),
  property.AddReadOnly(property.PathParameter),
  property.AddReadOnly(property.Payload)
]);
