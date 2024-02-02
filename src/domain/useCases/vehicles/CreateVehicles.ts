import { Vehicles } from "../../entities/Vehicles";
import { VehiclesCommandRepository } from "../../repositories/vehicles/VehiclesCommandRepository";
import { Usecase } from "../Usecase";

export class CreateVehicles implements Usecase<string, Vehicles> {
  constructor(
    private readonly vehiclesCommandRepository: VehiclesCommandRepository
  ) {}
  async execute(userId: string): Promise<Vehicles> {
    const vehicle = Vehicles.create(userId);
    this.vehiclesCommandRepository.save(vehicle);
    return vehicle;
  }
}
