import { v4 } from "uuid";
import { Position } from "../valuesObject/Position";
import { VehiclesError } from "../models/errors/VehiclesError";

export interface VehiclesProps {
  id: string;
  fleetId: string[];
  positions: Position[];
  vehiclePlateNumber: string;
}

export class Vehicles {
  props: VehiclesProps;
  constructor(props: VehiclesProps) {
    this.props = props;
  }

  static create(fleetId: string, vehiclePlateNumber: string) {
    const fleetIdArr = [];
    fleetIdArr.push(fleetId);
    return new Vehicles({
      id: v4(),
      fleetId: fleetIdArr,
      positions: [],
      vehiclePlateNumber,
    });
  }

  addPosition(lat: number, lng: number, alt: number) {
    const newPosition = { lat, lng, alt };
    const positionExists = this.props.positions.some((position) => {
      return (
        +position.lat === +lat && +position.lng === +lng && +position.alt === +alt
      );
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
