"use strict";

const _ = require("../util");
const property = require("../property");

class All {}
exports.All = All;
_.setComponentBasicProps(All, "all", "All conditions must be valid", "All", []);

class Any {}
exports.Any = Any;
_.setComponentBasicProps(Any, "any", "Any condition must be valid", "Any", []);
