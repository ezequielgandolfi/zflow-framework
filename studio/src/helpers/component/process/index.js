import { buildNodeI1O2 } from "../../diagram/factory";

class ProcessComponent_Flow {
  static key = 'flow'
  static description = 'Execute';
  static shortDescription = 'Flow';

  static properties = [];
}

export class ProcessComponent {
  static description = 'Process';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'cpu') };

  static components = [
    ProcessComponent_Flow
  ];

}
