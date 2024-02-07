import { User } from "../../../../entities/User";
import { UserQueryRepository } from "../../../../repositories/user/UserQueryRepository";

export class InMemoryUserQueryRepository implements UserQueryRepository {
  constructor(readonly userMap: Map<string, User>) {}

  async getById(id: string): Promise<User> {
    const user: User = this.userMap.get(id);
    return user;
  }
}
