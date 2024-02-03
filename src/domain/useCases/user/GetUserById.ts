import { inject, injectable } from "inversify";
import { User } from "../../entities/User";
import { UserQueryRepository } from "../../repositories/user/UserQueryRepository";
import { Usecase } from "../Usecase";
import { VFPMIdentifiers } from "../VFPMIdentifiers";

@injectable()
export class GetUserById implements Usecase<string, User> {
  constructor(
    @inject(VFPMIdentifiers.userQueryRepository)
    private readonly userQueryRepository: UserQueryRepository
  ) {}
  execute(id: string): Promise<User> {
    return this.userQueryRepository.getById(id);
  }
}
