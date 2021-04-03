import { HANDLE_COLOR, NODE_HANDLE_TYPE } from "../../diagram/const";
import { buildNodeI1O2 } from "../../diagram/factory";

class ConditionComponent_All {
  static key = 'all'
  static description = 'All conditions must be valid';
  static shortDescription = 'All';
  
  static properties = [];
}

class ConditionComponent_Any {
  static key = 'any'
  static description = 'Any condition must be valid';
  static shortDescription = 'Any';

  static properties = [];
}

export class ConditionComponent {
  static description = 'Condition';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'stoplights', { output1: NODE_HANDLE_TYPE.output.true, output2: NODE_HANDLE_TYPE.output.false }, { output2: HANDLE_COLOR.alternative }) };

  static components = [
    ConditionComponent_All,
    ConditionComponent_Any
  ];

}
