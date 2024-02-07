import 'reflect-metadata';
import { Vehicles } from "../../entities/Vehicles";
import { CreateVehicles } from "../../useCases/vehicles/CreateVehicles";
import { GetVehiclesById } from "../../useCases/vehicles/GetVehiclesById";
import { InMemoryVehiclesCommandRepository } from "../infra/inMemory/commands/InMemoryVehiclesCommandRepository";
import { InMemoryVehiclesQueryRepository } from "../infra/inMemory/queries/InMemoryVehiclesQueryRepository";

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
        createVehicle = new CreateVehicles();
        vehiclesQueryRepo = new InMemoryVehiclesQueryRepository(vehiclesMap);
        vehicles = await createVehicle.execute({
            fleetId:"0000",
            vehiclePlateNumber:"AZ458",
        });
        vehiclesCommandRepo.save(vehicles);
        getVehiclesById = new GetVehiclesById(vehiclesQueryRepo);
    })
    it("Should return a vehicle by id", async () => {
        const result = await getVehiclesById.execute(vehicles.props.id);
        expect(result.props.id).toEqual(vehicles.props.id);
    })
})