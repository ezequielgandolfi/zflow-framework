import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class For extends ComponentType.Repeat {
  static key = "for";
  static description = "FOR loop within a range";
  static shortDescription = "For";
  static properties = [
    Property.FromNumber,
    Property.ToNumber,
    Property.AddReadOnly(Property.CurrentNumber)
  ];

  from = new ZFlowTypes.DataType.TNumber();
  to = new ZFlowTypes.DataType.TNumber();
  current = new ZFlowTypes.DataType.TNumber();

  resume() {
    this.execute();
  }

  execute() {
    if (isNaN(this.current.get())) {
      this.current.set(this.from.get());
    }
    else {
      this.current.set(this.current.get()+1);
    }
    if (this.current.get() <= this.to.get()) {
      const watcher = this.$engine.flow.listenStreamCompleted(this.$data.id, "repeat");
      watcher.on(ZFlowTypes.Engine.ListenerEvent.STREAM_COMPLETED, () => { 
        this.$engine.flow.freeChildComponents(this.$data.id, "repeat");
        this.$event.dispatch("resume", { id: this.$data.id });
      });
      this.$output.repeat();
    }
    else {
      this.$output.end();
    }
  }
}

