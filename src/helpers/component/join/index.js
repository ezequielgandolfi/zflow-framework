import { HANDLE_COLOR, NODE_HANDLE_TYPE } from "../../diagram/const";
import { buildNodeI1O2 } from "../../diagram/factory";

class JoinComponent_First {
  static key = 'first'
  static description = 'Go on first event';
  static shortDescription = 'First';

  static properties = [];
}

class JoinComponent_All {
  static key = 'all'
  static description = 'Wait all events';
  static shortDescription = 'All';

  static properties = [];
}

export class JoinComponent {
  static description = 'Join process';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'stack', { input1: NODE_HANDLE_TYPE.input.multiple }, { input1: HANDLE_COLOR.multiple }) };

  static components = [
    JoinComponent_First,
    JoinComponent_All
  ];

}
