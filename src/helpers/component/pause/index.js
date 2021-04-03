import { buildNodeI1O1 } from "../../diagram/factory";
import { Property_Milliseconds } from "../property";

class PauseComponent_Delay {
  static key = 'delay'
  static description = 'Delay a certain amount of time';
  static shortDescription = 'Delay';

  static properties = [
    Property_Milliseconds
  ];
}

export class PauseComponent {
  static description = 'Pause';
  static diagramNode = ({ data }) => { return buildNodeI1O1(data, 'clock') };

  static components = [
    PauseComponent_Delay
  ];

}
