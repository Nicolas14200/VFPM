import "reflect-metadata";
import { Fleet } from "../../entities/Fleet";
import { InMemoryFleetCommandRepository } from "../infra/inMemory/commands/InMemoryFleetCommandRepository";
import { CreateFleet } from "../../useCases/fleet/CreateFleet";

describe("Unit - CreateFleet", () => {
  let FleetCommandRepo: InMemoryFleetCommandRepository;
  let fleetMap: Map<string, Fleet>;
  let createFleet: CreateFleet;

  beforeAll(() => {
    fleetMap = new Map();
    FleetCommandRepo = new InMemoryFleetCommandRepository(fleetMap);
    createFleet = new CreateFleet(FleetCommandRepo);
  });

  it("Should create a fleet", async () => {
    const result = await createFleet.execute();
    expect(result.props.plateNumbers).toBeDefined();
    expect(result.props.id).toBeDefined();
  });
});
