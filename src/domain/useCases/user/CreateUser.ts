import { User } from "../../entities/User";
import { Usecase } from "../Usecase";
import { UserCommandRepository } from "../../repositories/user/UserCommandRepository";

export class CreateUser implements Usecase<string, User>{

    constructor(private readonly userCommandRepository: UserCommandRepository) 
    {}
    
    async execute(name: string): Promise<User> {
        const user = User.create(name);
        this.userCommandRepository.save(user);
        return user;
    }

}