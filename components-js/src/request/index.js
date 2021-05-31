"use strict";

const _ = require("../util");
const property = require("../property");

class Get {}
exports.Get = Get;
_.setComponentBasicProps(Get, "get", "GET request", "Get", []);
