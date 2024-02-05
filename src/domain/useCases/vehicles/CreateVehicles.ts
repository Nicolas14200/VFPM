import { inject, injectable } from "inversify";
import { Vehicles } from "../../entities/Vehicles";
import { VehiclesCommandRepository } from "../../repositories/vehicles/VehiclesCommandRepository";
import { Usecase } from "../../models/Usecase";
import { VFPMIdentifiers } from "../../models/VFPMIdentifiers";

export interface CreateVehiclesProps {
  userId: string, 
  vehiclePlateNumber:string
}

@injectable()
export class CreateVehicles implements Usecase<CreateVehiclesProps, Vehicles> {
  constructor(
    @inject(VFPMIdentifiers.vehiclesCommandRepository)
    private readonly vehiclesCommandRepository: VehiclesCommandRepository
  ) {}
  async execute(payload: CreateVehiclesProps): Promise<Vehicles> {
    const vehicle = Vehicles.create(payload.userId, payload.vehiclePlateNumber);
    this.vehiclesCommandRepository.save(vehicle);
    return vehicle;
  }
}
