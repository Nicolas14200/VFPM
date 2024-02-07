import { inject, injectable } from "inversify";
import { Fleet } from "../../entities/Fleet";
import { FleetCommandRepository } from "../../repositories/fleet/FleetCommandRepository";
import { Usecase } from "../../models/Usecase";
import { VFPMIdentifiers } from "../../models/VFPMIdentifiers";

@injectable()
export class CreateFleet implements Usecase<void, Fleet> {
  constructor(
    @inject(VFPMIdentifiers.fleetCommandRepository)
    private readonly fleetCommandRepository: FleetCommandRepository
  ) {}
  async execute(): Promise<Fleet> {
    return await this.fleetCommandRepository.save(Fleet.create());
  }
}
