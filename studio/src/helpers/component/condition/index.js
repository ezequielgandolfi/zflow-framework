import { HANDLE_COLOR, NODE_HANDLE_TYPE } from "../../diagram/const";
import { buildNodeI1O2 } from "../../diagram/factory";
import * as ZFlowComponents from "@zflow/components";

export class ConditionComponent {
  static description = 'Condition';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'stoplights', { output1: NODE_HANDLE_TYPE.output.true, output2: NODE_HANDLE_TYPE.output.false }, { output2: HANDLE_COLOR.alternative }) };

  static components = [
    ZFlowComponents.Component.condition.All,
    ZFlowComponents.Component.condition.Any
  ];

}
