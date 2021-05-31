"use strict";

const _ = require("../util");
const property = require("../property");

class Select {}
exports.Select = Select;
_.setComponentBasicProps(Select, "dbselect", "Select statement", "Select", []);
