import { v4 } from "uuid";

export interface UserProps {
  id: string;
  name: string;
  fleet: string[];
}

export class User {
  props: UserProps;
  constructor(props: UserProps) {
    this.props = props;
  }

  static create(name: string) {
    return new User({
      id: v4(),
      name: name,
      fleet: [],
    });
  }

  addNewFleet(fleetId: string) {
    this.props.fleet.push(fleetId);
  }
}
