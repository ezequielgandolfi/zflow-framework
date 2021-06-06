import * as ZFlowTypes from "@zflow/types";
import * as ComponentType from "../component-type";
import * as Property from "../property";

class MergeComponent extends ComponentType.OkError {
  static icon = "diagram-3";
}

export class MergeLists extends MergeComponent {
  static key = "merge.lists";
  static description = "Merge list items";
  static shortDescription = "Lists";
  static properties = [
  ];

  execute() {
    this.$output.ok();
  }
}
