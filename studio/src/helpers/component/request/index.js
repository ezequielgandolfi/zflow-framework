import { buildNodeI1O2 } from "../../diagram/factory";

class RequestComponent_Get {
  static key = 'get'
  static description = 'GET request';
  static shortDescription = 'Get';

  static properties = [];
}
export class RequestComponent {
  static description = 'Request';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'cloud') };

  static components = [
    RequestComponent_Get
  ];

}
