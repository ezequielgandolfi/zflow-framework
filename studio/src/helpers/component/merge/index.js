import { buildNodeI1O2 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class MergeComponent {
  static description = 'Merge data';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'diagram-3') };

  static components = [
    ZFlowComponents.Component.merge.Lists
  ];

}
