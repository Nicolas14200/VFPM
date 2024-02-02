import { User } from "../../entities/User";
import { UserCommandRepository } from "../../repositories/user/UserCommandRepository";
import { Usecase } from "../Usecase";
import { GetUserById } from "../user/GetUserById";

export interface RegisterVehiclesProps {
  userId: string;
  vehiclesId: string;
}
export class RegisterVehicles implements Usecase<RegisterVehiclesProps, User> {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly getUserById: GetUserById
  ) {}

  async execute(payload: RegisterVehiclesProps): Promise<User> {
    const user = await this.getUserById.execute(payload.userId);
    user.addVehicles(payload.vehiclesId);
    return await this.userCommandRepository.save(user);
  }
}
