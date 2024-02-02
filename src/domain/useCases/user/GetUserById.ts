import { User } from "../../entities/User";
import { UserQueryRepository } from "../../repositories/user/UserQueryRepository";
import { Usecase } from "../Usecase";

export class GetUserById implements Usecase<string, User> {
    constructor(private readonly userQueryRepository: UserQueryRepository) 
    {}
    execute(id: string): Promise<User> {
        return this.userQueryRepository.getById(id);
    }

}