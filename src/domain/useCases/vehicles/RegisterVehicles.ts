import { inject, injectable } from "inversify";
import { Usecase } from "../../models/Usecase";
import { VFPMIdentifiers } from "../../models/VFPMIdentifiers";
import { FleetQueryRepository } from "../../repositories/fleet/FleetQueryRepository";
import { FleetCommandRepository } from "../../repositories/fleet/FleetCommandRepository";
import { VehiclesQueryRepository } from "../../repositories/vehicles/VehiclesQueryRepository";
import { VehiclesError } from "../../models/errors/VehiclesError";

export interface RegisterVehiclesProps {
  fleetId: string;
  vehiclesId: string;
}

@injectable()
export class RegisterVehicles implements Usecase<RegisterVehiclesProps, void> {
  constructor(
    @inject(VFPMIdentifiers.fleetQueryRepository)
    private readonly fleetQueryRepository: FleetQueryRepository,
    @inject(VFPMIdentifiers.fleetCommandRepository)
    private readonly fleetCommandRepository: FleetCommandRepository,
    @inject(VFPMIdentifiers.vehiclesQueryRepository)
    private readonly vehiclesQueryRepository: VehiclesQueryRepository
  ) {}

  async execute(payload: RegisterVehiclesProps): Promise<void> {
    const fleet = await this.fleetQueryRepository.getById(payload.fleetId);
    const vehicle = await this.vehiclesQueryRepository.getById(
      payload.vehiclesId
    );
    if (!fleet || !vehicle) {
      throw new VehiclesError.RegisterVehiclesFailed(
        "Fleet or vehicles doesn't exist"
      );
    }
    fleet.addVehicle(vehicle.props.vehiclePlateNumber);

    await this.fleetCommandRepository.save(fleet);
  }
}
