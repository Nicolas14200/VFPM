import { inject, injectable } from "inversify";
import { Usecase } from "../Usecase";
import { VFPMIdentifiers } from "../VFPMIdentifiers";
import { FleetQueryRepository } from "../../repositories/fleet/FleetQueryRepository";
import { Fleet } from "../../entities/Fleet";

@injectable()
export class GetFleetById implements Usecase<string, Fleet> {
  constructor(
    @inject(VFPMIdentifiers.fleetQueryRepository)
    private readonly fleetQueryRepository: FleetQueryRepository
  ) {}
  execute(id: string): Promise<Fleet> {
    return this.fleetQueryRepository.getById(id);
  }
}
