import { inject, injectable } from "inversify";
import { Usecase } from "../../models/Usecase";
import { VFPMIdentifiers } from "../../models/VFPMIdentifiers";
import { UserQueryRepository } from "../../repositories/user/UserQueryRepository";
import { UserCommandRepository } from "../../repositories/user/UserCommandRepository";

export interface AsignFleetProps {
  userId: string;
  fleetId: string;
}

@injectable()
export class AsignFleet implements Usecase<AsignFleetProps, void> {
  constructor(
    @inject(VFPMIdentifiers.userCommandRepository)
    private readonly userQueryRepository: UserQueryRepository,
    @inject(VFPMIdentifiers.userCommandRepository)
    private readonly userCommandRepository: UserCommandRepository,
  ) {}

  async execute(payload: AsignFleetProps): Promise<void> {
    const user = await this.userQueryRepository.getById(payload.userId);
    user.addNewFleet(payload.fleetId);
    this.userCommandRepository.save(user);
    }
}
