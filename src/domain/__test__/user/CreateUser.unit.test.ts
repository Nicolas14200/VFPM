import 'reflect-metadata';
import { InMemoryUserCommandRepository } from "../infra/inMemory/commands/InMemoryUserCommandRepository";
import { InMemoryUserQueryRepository } from "../infra/inMemory/queries/InMemoryUserQueryRepository";
import { CreateUser } from "../../useCases/user/CreateUser";
import { User } from "../../entities/User";

describe("Unit - CreateUser", () => {
  let userMap: Map<string, User>;
  let userCommandRepo: InMemoryUserCommandRepository;
  let userQueryRepo: InMemoryUserQueryRepository;
  let createUser: CreateUser;
  let user: User;

  beforeAll(() => {
    userMap = new Map();
    userCommandRepo = new InMemoryUserCommandRepository(userMap);
    userQueryRepo = new InMemoryUserQueryRepository(userMap);
    createUser = new CreateUser(userCommandRepo);
  });

  it("Should create a user", async () => {
    user = await createUser.execute("Nico");
    expect(user.props.name).toEqual("Nico");
    expect(user.props.id).toBeDefined();
    expect(user.props.fleet).toBeDefined();
  });
});
