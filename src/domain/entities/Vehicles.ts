import { v4 } from "uuid";
import { Position } from "../valuesObject/Position";
import { VehiclesError } from "../models/errors/VehiclesError";

export interface VehiclesProps {
  id: string;
  userId: string;
  positions: Position[];
  vehiclePlateNumber:string;
}

export class Vehicles {
  props: VehiclesProps;
  constructor(props: VehiclesProps) {
    this.props = props;
  }

  static create(userId: string, vehiclePlateNumber:string ){
    return new Vehicles({
      id: v4(),
      userId,
      positions: [],
      vehiclePlateNumber
    });
  }

  addPosition(lat: number, lng: number) {
    const newPosition = { lat: lat, lng: lng };

    const positionExists = this.props.positions.some((position) => {
      return position.lat === lat && position.lng === lng;
    });

    if (!positionExists) {
      this.props.positions.push(newPosition);
    } else {
      throw new VehiclesError.VehiclesAlreadyParkAtLocation(
        "Vehicle is already parked at this location."
      );
    }
  }
}
