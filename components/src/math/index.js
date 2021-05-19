"use strict";

const _ = require("../util");
const property = require("../property");

class Sum {}
exports.Sum = Sum;
_.setComponentBasicProps(Sum, "sum", "Sum values", "Sum", []);
