import { v4 } from "uuid";

export interface FleetProps {
  id: string;
  PlateNumbers: string[];
}
export class Fleet {
  props: FleetProps;
  constructor(props: FleetProps) {
    this.props = props;
  }

  static create() {
    return new Fleet({
      id: v4(),
      PlateNumbers: [],
    });
  }
}
