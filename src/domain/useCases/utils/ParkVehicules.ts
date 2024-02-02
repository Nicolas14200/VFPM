import { Vehicles } from "../../entities/Vehicles";
import { VehiclesCommandRepository } from "../../repositories/vehicles/VehiclesCommandRepository";
import { Position } from "../../valuesObject/Position";
import { Usecase } from "../Usecase";
import { GetUserById } from "../user/GetUserById";
import { GetVehiclesById } from "../vehicles/GetVehiclesById";

export interface ParkVehiclesProps {
  position: Position;
  userId: string;
  vehiculeId: string;
}

export class ParkVehicles implements Usecase<ParkVehiclesProps, Vehicles> {
  constructor(
    private readonly getUserById: GetUserById,
    private readonly getVehiclesById: GetVehiclesById,
    private readonly vehiclesCommandRepository: VehiclesCommandRepository
  ) {}
  async execute(payload: ParkVehiclesProps): Promise<Vehicles> {
    const user = await this.getUserById.execute(payload.userId);
    if (user.props.fleet.includes(payload.vehiculeId)) {
      const vehicle = await this.getVehiclesById.execute(payload.vehiculeId);
      vehicle.addPosition(payload.position.lat, payload.position.lng);
      await this.vehiclesCommandRepository.save(vehicle);
      return vehicle;
    }
  }
}
