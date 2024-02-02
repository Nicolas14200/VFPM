import { User } from "../../entities/User";

export interface UserCommandRepository {
    save(user: User) : Promise<User>;
}