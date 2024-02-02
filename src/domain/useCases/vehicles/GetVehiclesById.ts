import { Vehicles } from "../../entities/Vehicles";
import { VehiclesQueryRepository } from "../../repositories/vehicles/VehiclesQueryRepository";
import { Usecase } from "../Usecase";

export class GetVehiclesById implements Usecase<string, Vehicles> {
    constructor(
        private readonly vehiclesQueryRepository: VehiclesQueryRepository
      ) {}
    execute(id: string): Vehicles | Promise<Vehicles> {
        return this.vehiclesQueryRepository.getById(id);
    }

}