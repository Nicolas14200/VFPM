import { v4 } from "uuid";
import { Position } from "../valuesObject/Position";
import { VehiclesError } from "../models/errors/VehiclesError";

export interface VehiclesProps {
  id: string;
  userId: string;
  positions?: Position[];
}

export class Vehicles {
  props: VehiclesProps;
  constructor(props: VehiclesProps) {
    this.props = props;
  }

  static create(userId: string) {
    return new Vehicles({
      id: v4(),
      userId: userId,
    });
  }

  addPosition(lat: number, lng: number) {
    if (
      !this.props.positions.includes({
        lat: lat,
        lng: lng,
      })
    ) {
      this.props.positions.push({
        lat: lat,
        lng: lng,
      });
    } else {
      throw new VehiclesError.VehiclesAlreadyParkAtLocation(
        "Vehicle is already parked at this location."
      );
    }
  }
}
