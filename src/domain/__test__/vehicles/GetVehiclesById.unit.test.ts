import { Vehicles } from "../../entities/Vehicles";
import { CreateVehicles } from "../../useCases/vehicles/CreateVehicles";
import { GetVehiclesById } from "../../useCases/vehicles/GetVehiclesById";
import { InMemoryVehiclesCommandRepository } from "../adapters/inMemory/commands/InMemoryVehiclesCommandRepository";
import { InMemoryVehiclesQueryRepository } from "../adapters/inMemory/queries/InMemoryVehiclesQueryRepository";

describe("Unit - GetVehiclesById", () => {
    let vehiclesMap: Map<string, Vehicles>;
    let createVehicle : CreateVehicles;
    let vehiclesCommandRepo: InMemoryVehiclesCommandRepository;
    let vehiclesQueryRepo: InMemoryVehiclesQueryRepository;
    let getVehiclesById: GetVehiclesById;
    let vehicles: Vehicles;

    beforeAll(async ()=> {
        vehiclesMap = new Map();
        vehiclesCommandRepo = new InMemoryVehiclesCommandRepository(vehiclesMap);
        createVehicle = new CreateVehicles(vehiclesCommandRepo);
        vehiclesQueryRepo = new InMemoryVehiclesQueryRepository(vehiclesMap);
        vehicles = await createVehicle.execute("0000");
        getVehiclesById = new GetVehiclesById(vehiclesQueryRepo);
    })
    it("Should return a vehicle by id", async () => {
        const result = await getVehiclesById.execute(vehicles.props.id);
        console.log(result)
        expect(result.props.id).toEqual(vehicles.props.id);
    })
})