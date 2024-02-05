import { inject, injectable } from "inversify";
import { Vehicles } from "../../entities/Vehicles";
import { VehiclesCommandRepository } from "../../repositories/vehicles/VehiclesCommandRepository";
import { Position } from "../../valuesObject/Position";
import { Usecase } from "../../models/Usecase";
import { VFPMIdentifiers } from "../../models/VFPMIdentifiers";
import { VehiclesQueryRepository } from "../../repositories/vehicles/VehiclesQueryRepository";
import { VehiclesError } from "../../models/errors/VehiclesError";

export interface ParkVehiclesProps {
  position: Position;
  vehiculeId: string;
}

@injectable()
export class ParkVehicles implements Usecase<ParkVehiclesProps, Vehicles> {
  constructor(
    @inject(VFPMIdentifiers.vehiclesQueryRepository)
    private readonly vehiclesQueryRepository: VehiclesQueryRepository,
    @inject(VFPMIdentifiers.vehiclesCommandRepository)
    private readonly vehiclesCommandRepository: VehiclesCommandRepository
  ) {}

  async execute(payload: ParkVehiclesProps): Promise<Vehicles> {
    const vehicle = await this.vehiclesQueryRepository.getById(
      payload.vehiculeId
    );
    if(!vehicle){
      throw new VehiclesError.VehiclesNotFound("Vehicle not found.")
    }
    vehicle.addPosition(payload.position.lat, payload.position.lng);
    await this.vehiclesCommandRepository.save(vehicle);
    return vehicle;
  }
}
