import { buildNodeI1O2 } from "../../diagram/factory";
import { Property_Text } from "../property";

class FunctionComponent_Log {
  static key = 'log'
  static description = 'Log';
  static shortDescription = 'Log';

  static properties = [
    Property_Text
  ];
}

export class FunctionComponent {
  static description = 'Function';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'command') };

  static components = [
    FunctionComponent_Log
  ];

}
