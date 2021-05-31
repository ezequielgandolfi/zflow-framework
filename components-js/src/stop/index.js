"use strict";

const _ = require("../util");
const property = require("../property");

class Error {}
exports.Error = Error;
_.setComponentBasicProps(Error, "error", "Stop with error condition", "Error", []);
