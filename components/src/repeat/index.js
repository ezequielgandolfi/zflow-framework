"use strict";

const _ = require("../util");
const property = require("../property");
const component = require("../component");

class For extends component.Repeat {
  from;
  to;
  current;

  fix() {
    this.from = parseInt(this.from);
    this.to = parseInt(this.to);
    this.current = null;
  }

  execute() {
    this.resume();
    if (isNaN(this.current)) {
      this.current = this.from;
    }
    else {
      this.current++;
    }
    if (this.current <= this.to) {
      this.$engine.flow.watchStreamEnd(this.$data.id, "repeat").on(this.$engine.flow.CONSTS.WATCH.STREAM_END, () => { 
        this.$engine.flow.freeChildComponents(this.$data.id);
        this.change.emit(this.$engine.flow.CONSTS.EXEC.AGAIN, { id: this.$data.id });
      });
      this.repeat();
    }
    else {
      this.end();
    }
  }
}
exports.For = For;
_.setComponentBasicProps(For, "for", "FOR loop within a range", "For", [
  property.FromNumber,
  property.ToNumber,
  property.AddReadOnly(property.CurrentNumber)
]);

class Each {}
exports.Each = Each;
_.setComponentBasicProps(Each, "each", "Iterates over a list", "Each", []);
