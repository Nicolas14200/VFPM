import 'reflect-metadata';
import { Fleet } from "../../entities/Fleet";
import { InMemoryFleetQueryRepository } from "../infra/inMemory/queries/InMemoryFleetQueryRepository";
import { InMemoryFleetCommandRepository } from "../infra/inMemory/commands/InMemoryFleetCommandRepository";
import {GetFleetById} from "../../useCases/fleet/GetFleetById";
import {CreateFleet} from "../../useCases/fleet/CreateFleet";

describe('Unit - GetFleetById', () => {
    let FleetCommandRepo: InMemoryFleetCommandRepository;
    let FleetQueryRepo: InMemoryFleetQueryRepository;
    let fleetMap: Map<string, Fleet>;
    let getFleetById: GetFleetById;
    let createFleet: CreateFleet;
    let fleet: Fleet;

    beforeAll(async ()=> {
        fleetMap = new Map();
        FleetQueryRepo = new InMemoryFleetQueryRepository(fleetMap);
        FleetCommandRepo = new InMemoryFleetCommandRepository(fleetMap);
        getFleetById = new GetFleetById(FleetQueryRepo);
        createFleet = new CreateFleet(FleetCommandRepo);
        fleet = await createFleet.execute();
    })

    it("Should return a fleet by id", async () => {
        const result = await getFleetById.execute(fleet.props.id);
        expect(result.props.id).toEqual(fleet.props.id);
    })
})