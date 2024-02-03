import { inject } from "inversify";
import { Fleet } from "../../entities/Fleet";
import { FleetCommandRepository } from "../../repositories/fleet/FleetCommandRepository";
import { Usecase } from "../Usecase";
import { VFPMIdentifiers } from "../VFPMIdentifiers";

export class CreateFleet implements Usecase<void, Fleet> {
    constructor(
        @inject(VFPMIdentifiers.fleetCommandRepository)
        private readonly fleetCommandRepository: FleetCommandRepository
      ) {}
    async execute(): Promise<Fleet> {
        return await this.fleetCommandRepository.save(Fleet.create());
    }
    
}