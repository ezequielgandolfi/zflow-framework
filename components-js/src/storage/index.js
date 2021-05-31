"use strict";

const _ = require("../util");
const property = require("../property");

class ReadFile {}
exports.ReadFile = ReadFile;
_.setComponentBasicProps(ReadFile, "readfile", "Read a data file", "R.File", []);

class WriteFile {}
exports.WriteFile = WriteFile;
_.setComponentBasicProps(WriteFile, "writefile", "Write a data file", "W.File", []);
