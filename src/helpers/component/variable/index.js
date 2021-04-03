import { buildNodeI1O1 } from "../../diagram/factory";

class VariableComponent_Set {
  static key = 'set'
  static description = 'Set a value';
  static shortDescription = 'Set';

  static properties = [];
}

export class VariableComponent {
  static description = 'Variable';
  static diagramNode = ({ data }) => { return buildNodeI1O1(data, 'braces') };

  static components = [
    VariableComponent_Set
  ];

}
