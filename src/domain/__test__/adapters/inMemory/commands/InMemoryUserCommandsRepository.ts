import { User } from "../../../../entities/User";
import { UserCommandRepository } from "../../../../repositories/user/UserCommandRepository";

export class InMemoryUserCommandsRepository implements UserCommandRepository {

    constructor(readonly userMap: Map<string, User>) {}
    async save(user: User): Promise<User> {
        this.userMap.set(user.props.id, user);
        return user;
    }

}