import 'reflect-metadata';
import { User } from "../../entities/User";
import { Fleet } from "../../entities/Fleet";
import { AsignFleet } from "../../useCases/user/AsignFleet";
import { InMemoryUserCommandRepository } from "../adapters/inMemory/commands/InMemoryUserCommandRepository";
import { InMemoryUserQueryRepository } from "../adapters/inMemory/queries/InMemoryUserQueryRepository";
import {UserError} from "../../models/errors/UserError";

describe("Unit - Asignfleet", () => {
  let userMap: Map<string, User>;
  let user: User;
  let fleet: Fleet;
  let asignFleet: AsignFleet;
  let userCommandRepo: InMemoryUserCommandRepository;
  let userQueryRepo: InMemoryUserQueryRepository;

  beforeAll(() => {
    user = User.create("nico");
    fleet = Fleet.create();
    userMap = new Map();
    userCommandRepo = new InMemoryUserCommandRepository(userMap);
    userQueryRepo = new InMemoryUserQueryRepository(userMap);
    userCommandRepo.save(user);
    asignFleet = new AsignFleet(userQueryRepo, userCommandRepo);
  });
  
  it("Should add new fleet in fleet array of user", async () => {
    await asignFleet.execute({
      userId: user.props.id,
      fleetId: fleet.props.id,
    });
    const result = await userQueryRepo.getById(user.props.id)
    expect(result.props.fleet[0]).toEqual(fleet.props.id);
  });

  it("Should return an error if user not exist", async () => {
    const result = asignFleet.execute({
      userId: "fake ID",
      fleetId: fleet.props.id,
    });
    expect(result).rejects.toThrow(UserError.UserNotFound)
  });
});
