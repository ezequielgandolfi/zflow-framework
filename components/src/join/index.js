"use strict";

const _ = require("../util");
const property = require("../property");

class First {}
exports.First = First;
_.setComponentBasicProps(First, "first", "'Go on first event", "First", []);

class All {}
exports.All = All;
_.setComponentBasicProps(All, "all", "Wait all events", "All", []);
