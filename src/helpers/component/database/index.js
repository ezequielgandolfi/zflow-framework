import { buildNodeI1O2 } from "../../diagram/factory";

class DatabaseComponent_Select {
  static key = 'dbselect'
  static description = 'Select statement';
  static shortDescription = 'Select';

  static properties = [];
}

export class DatabaseComponent {
  static description = 'Database';
  static diagramNode = ({ data }) => { return buildNodeI1O2(data, 'server') };

  static components = [
    DatabaseComponent_Select
  ];

}
