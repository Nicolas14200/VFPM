import { v4 } from "uuid";
import { UserError } from "../models/errors/UserError";

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

  addVehicles(id: string) {
    if (!this.props.fleet.includes(id)) {
      this.props.fleet.push(id);
    } else {
      throw new UserError.VehiclesAlreadyExisting("Vehicles Already Existing");
    }
  }
}
