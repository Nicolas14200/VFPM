import { inject, injectable } from "inversify";
import { User } from "../../entities/User";
import { UserCommandRepository } from "../../repositories/user/UserCommandRepository";
import { Usecase } from "../Usecase";
import { GetUserById } from "../user/GetUserById";
import { VFPMIdentifiers } from "../VFPMIdentifiers";

export interface RegisterVehiclesProps {
  userId: string;
  vehiclesId: string;
}

@injectable()
export class RegisterVehicles implements Usecase<RegisterVehiclesProps, User> {
  constructor(
    @inject(VFPMIdentifiers.userCommandRepository)
    private readonly userCommandRepository: UserCommandRepository,
    @inject(VFPMIdentifiers.getUserById)
    private readonly getUserById: GetUserById
  ) {}

  async execute(payload: RegisterVehiclesProps): Promise<User> {
    const user = await this.getUserById.execute(payload.userId);
    user.addVehicles(payload.vehiclesId);
    return await this.userCommandRepository.save(user);
  }
}
