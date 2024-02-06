import { User } from "../../entities/User";

export interface UserCommandRepository {
    save(user: User) : Promise<User>;
    update(user: User) : Promise<User>;
}