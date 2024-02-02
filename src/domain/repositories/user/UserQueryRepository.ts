import { User } from "../../entities/User";

export interface UserQueryRepository {
    getById(id: string) : Promise<User>;
}