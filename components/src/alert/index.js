"use strict";

const _ = require("../util");
const Property = require("../property");

class AlertComponent_Force {}
exports.AlertComponent_Force = AlertComponent_Force;
_.defineProperty(AlertComponent_Force, "key", "force");
_.defineProperty(AlertComponent_Force, "description", "Force alert condition");
_.defineProperty(AlertComponent_Force, "shortDescription", "Force");
_.defineProperty(AlertComponent_Force, "properties", [Property.Text, Property.AddReadOnly(Property.Payload)]);
