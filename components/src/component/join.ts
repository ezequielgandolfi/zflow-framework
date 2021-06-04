import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

export class First extends ComponentType.Join {
  static key = "first";
  static description = "Go on first event";
  static shortDescription = "First";
  static properties = [
  ];

  execute() {
    if (this.$status === ZFlowTypes.Component.ComponentStatus.PRISTINE) {
      this.$output.ok();
    }
  }

  resume() {
  }
}

export class All extends ComponentType.Join {
  static key = "all";
  static description = "Wait all events";
  static shortDescription = "All";
  static properties = [
  ];

  execute() {
    // only take action on first execution
    if (this.$status === ZFlowTypes.Component.ComponentStatus.PRISTINE) {
      if (!this.hasPendingInputs(this.$data.id)) {
        this.$output.ok();
      }
      else {
        this.suspend();
        this.waitForInputs();
      }
    }
  }

  resume() {    
  }

  private hasPendingInputs(id: string) {
    const inputs = this.$engine.flow.getFlow()
      .filter((f:ZFlowTypes.Component.Output) => f.target === id)
      .map((f:ZFlowTypes.Component.Output) => f.source);
    return !!inputs.find(input => {
      const comp = this.$engine.flow.getStoredComponent(input);
      if (comp) {
        return (comp.$status !== ZFlowTypes.Component.ComponentStatus.FINISHED);
      }
      return this.hasPendingInputs(input);
    });
  }

  private waitForInputs() {
    this.$engine.flow.listenComponentCompleted(this.$data.id).on(ZFlowTypes.Engine.ListenerEvent.COMPONENT_COMPLETED, () => {
      if (!this.hasPendingInputs(this.$data.id)) {
        this.$engine.flow.unlistenComponentCompleted(this.$data.id);
        this.$output.ok();
      }
    });
  }

}
