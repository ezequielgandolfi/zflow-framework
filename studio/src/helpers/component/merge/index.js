import { buildNodeI1O2 } from "../../diagram/factory";

class MergeComponent_Array {
  static key = 'array'
  static description = 'Merge array items';
  static shortDescription = 'Array';

  static properties = [];
}

export class MergeComponent {
  static description = 'Merge data';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'diagram-3') };

  static components = [
    MergeComponent_Array
  ];

}
