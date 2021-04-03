import { buildNodeI1O2 } from "../../diagram/factory";

class MathComponent_Sum {
  static key = 'sum'
  static description = 'Sum values';
  static shortDescription = 'Sum';

  static properties = [];
}

export class MathComponent {
  static description = 'Math';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'percent') };

  static components = [
    MathComponent_Sum
  ];

}
