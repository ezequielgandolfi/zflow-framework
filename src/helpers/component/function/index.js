import { buildNodeI1O2 } from "../../diagram/factory";

class FunctionComponent_Dummy {
  static key = 'dummy'
  static description = 'Nothing...';
  static shortDescription = 'Dummy';

  static properties = [];
}

export class FunctionComponent {
  static description = 'Function';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'tools') };

  static components = [
    FunctionComponent_Dummy
  ];

}
