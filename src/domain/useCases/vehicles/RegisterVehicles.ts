import { inject, injectable } from "inversify";
import { Usecase } from "../../models/Usecase";
import { VFPMIdentifiers } from "../../models/VFPMIdentifiers";
import { FleetQueryRepository } from "../../repositories/fleet/FleetQueryRepository";
import { FleetCommandRepository } from "../../repositories/fleet/FleetCommandRepository";
import { VehiclesError } from "../../models/errors/VehiclesError";
import { CreateVehicles } from "./CreateVehicles";
import { VehiclesCommandRepository } from "../../repositories/vehicles/VehiclesCommandRepository";

export interface RegisterVehiclesProps {
  fleetId: string;
  vehiclePlateNumber: string;
}

@injectable()
export class RegisterVehicles implements Usecase<RegisterVehiclesProps, void> {
  constructor(
    @inject(VFPMIdentifiers.fleetQueryRepository)
    private readonly fleetQueryRepository: FleetQueryRepository,
    @inject(VFPMIdentifiers.fleetCommandRepository)
    private readonly fleetCommandRepository: FleetCommandRepository,
    @inject(VFPMIdentifiers.vehiclesCommandRepository)
    private readonly vehiclesCommandRepository: VehiclesCommandRepository,
    private readonly createVehicles: CreateVehicles,
  ) {}

  async execute(payload: RegisterVehiclesProps): Promise<void> {
    try {
      const fleet = await this.fleetQueryRepository.getById(payload.fleetId);
      if (!fleet ) {
        throw new VehiclesError.RegisterVehiclesFailed(
          "Fleet doesn't exist"
        );
      }
      fleet.addVehicle(payload.vehiclePlateNumber);
      await this.fleetCommandRepository.update(fleet);

      const vehicle = await this.createVehicles.execute({
        fleetId: payload.fleetId,
        vehiclePlateNumber: payload.vehiclePlateNumber,
      })
      await this.vehiclesCommandRepository.save(vehicle)

    } catch (error) {
      throw error;
    }
  }
}
