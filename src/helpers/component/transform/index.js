import { buildNodeI1O2 } from "../../diagram/factory";

class TransformComponent_Object2Object {
  static key = 'o2o'
  static description = 'Object to object';
  static shortDescription = 'Obj>Obj';

  static properties = [];
}

export class TransformComponent {
  static description = 'Transform data';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'shuffle') };

  static components = [
    TransformComponent_Object2Object
  ];

}
