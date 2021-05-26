"use strict";

const _ = require("../util");
const property = require("../property");
const component = require("../component");

class Log extends component.Ok {
  text;

  execute() {
    console.log(this.text);
    this.dispatch("ok");
  }
}
exports.Log = Log;
_.setComponentBasicProps(Log, "log", "Log", "Log", [
  property.Text
]);
