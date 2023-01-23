import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class RepeatComponent extends ComponentType.Repeat {
  static icon = "arrow-repeat";
}

export class RepeatFor extends RepeatComponent {
  static key = "repeat.for";
  static description = "FOR loop within a range";
  static shortDescription = "For";
  static properties = [
    Property.FromNumber,
    Property.ToNumber,
    Property.AddReadOnly(Property.CurrentNumber)
  ];

  from = new ZFlowTypes.DataType.Number();
  to = new ZFlowTypes.DataType.Number();
  current = new ZFlowTypes.DataType.Number();

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
      const event: ZFlowTypes.Engine.ListenerEventType = 'stream_completed';
      watcher.on(event, () => { 
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

