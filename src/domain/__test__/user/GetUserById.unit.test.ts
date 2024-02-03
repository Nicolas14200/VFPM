import 'reflect-metadata';
import { InMemoryUserCommandRepository } from "../adapters/inMemory/commands/InMemoryUserCommandRepository";
import { InMemoryUserQueryRepository } from "../adapters/inMemory/queries/InMemoryUserQueryRepository";
import { CreateUser } from "../../useCases/user/CreateUser";
import { User } from "../../entities/User";
import {GetUserById} from "../../useCases/user/GetUserById";

describe("Unit - CreateUser", () => {
    let userMap: Map<string, User>;
    let userCommandRepo: InMemoryUserCommandRepository;
    let userQueryRepo: InMemoryUserQueryRepository;
    let createUser: CreateUser;
    let user: User;
    let getUserById : GetUserById;

    beforeAll(async () => {
        userMap = new Map();
        userCommandRepo = new InMemoryUserCommandRepository(userMap);
        userQueryRepo = new InMemoryUserQueryRepository(userMap);
        createUser = new CreateUser(userCommandRepo);
        getUserById = new GetUserById(userQueryRepo);
        user = await createUser.execute("Nico");
    })

    it("Should create a user", async () => {
        const result = await getUserById.execute(user.props.id);
        expect(result.props.name).toEqual("Nico");
    })
})