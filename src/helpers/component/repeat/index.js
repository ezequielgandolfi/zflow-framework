import { HANDLE_COLOR, NODE_HANDLE_TYPE } from "../../diagram/const";
import { buildNodeI1O2 } from "../../diagram/factory";

class RepeatComponent_For {
  static key = 'for'
  static description = 'FOR loop within a range';
  static shortDescription = 'For';

  static properties = [];
}

class RepeatComponent_Each {
  static key = 'each'
  static description = 'Iterates over a list';
  static shortDescription = 'Each';

  static properties = [];
}

export class RepeatComponent {
  static description = 'Repeat';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'arrow-repeat', { output1: NODE_HANDLE_TYPE.output.repeat, output2: NODE_HANDLE_TYPE.output.end }, { output2: HANDLE_COLOR.alternative }) };

  static components = [
    RepeatComponent_For,
    RepeatComponent_Each
  ];

}
