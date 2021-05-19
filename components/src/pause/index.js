"use strict";

const _ = require("../util");
const property = require("../property");

class Delay {}
exports.Delay = Delay;
_.setComponentBasicProps(Delay, "delay", "Delay a certain amount of time", "Delay", [property.Milliseconds]);
