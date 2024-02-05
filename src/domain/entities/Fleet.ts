import { v4 } from "uuid";
import { FleetError } from "../models/errors/FleetError";

export interface FleetProps {
  id: string;
  plateNumbers: string[];
}
export class Fleet {
  props: FleetProps;
  constructor(props: FleetProps) {
    this.props = props;
  }

  static create() {
    return new Fleet({
      id: v4(),
      plateNumbers: [],
    });
  }

  addVehicle(plateNumber: string){
    if (!this.props.plateNumbers.includes(plateNumber)) {
      this.props.plateNumbers.push(plateNumber);
    } else {
      throw new FleetError.VehiclesAlreadyExisting("Vehicles Already Existing");
    }
  }
}
