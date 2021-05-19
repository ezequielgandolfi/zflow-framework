import { buildNodeI1O2 } from "../../diagram/factory";

const components = require("@zflow/components/merge");

export class MergeComponent {
  static description = 'Merge data';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'diagram-3') };

  static components = [
    components.Lists
  ];

}
