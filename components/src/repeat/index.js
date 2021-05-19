"use strict";

const _ = require("../util");
const property = require("../property");

class For {}
exports.For = For;
_.setComponentBasicProps(For, "for", "FOR loop within a range", "For", []);

class Each {}
exports.Each = Each;
_.setComponentBasicProps(Each, "each", "Iterates over a list", "Each", []);
