"use strict";

const _ = require("../util");
const property = require("../property");

class Set {}
exports.Set = Set;
_.setComponentBasicProps(Set, "set", "Set a value", "Set", []);
