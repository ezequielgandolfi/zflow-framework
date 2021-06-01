import { buildNodeI1O1 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class PauseComponent {
  static description = 'Pause';
  static diagramNode = ({ data }) => { return buildNodeI1O1(data, 'clock') };

  static components = [
    ZFlowComponents.Component.pause.Delay
  ];

}
