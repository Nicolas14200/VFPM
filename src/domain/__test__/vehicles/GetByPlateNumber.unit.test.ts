import 'reflect-metadata';
import { Vehicles } from "../../entities/Vehicles";
import { CreateVehicles } from "../../useCases/vehicles/CreateVehicles";
import { GetByPlateNumber } from "../../useCases/vehicles/GetByPlateNumber";
import { InMemoryVehiclesCommandRepository } from "../adapters/inMemory/commands/InMemoryVehiclesCommandRepository";
import { InMemoryVehiclesQueryRepository } from "../adapters/inMemory/queries/InMemoryVehiclesQueryRepository";

describe('Unit - GetByPlateNumber', () => {
    let vehiclesMap: Map<string, Vehicles>;
    let createVehicle : CreateVehicles;
    let vehiclesCommandRepo: InMemoryVehiclesCommandRepository;
    let vehiclesQueryRepo: InMemoryVehiclesQueryRepository;
    let getByPlateNumber: GetByPlateNumber;
    let vehicles: Vehicles;

    beforeAll(async ()=> {
        vehiclesMap = new Map();
        vehiclesCommandRepo = new InMemoryVehiclesCommandRepository(vehiclesMap);
        createVehicle = new CreateVehicles();
        vehiclesQueryRepo = new InMemoryVehiclesQueryRepository(vehiclesMap);
        vehicles = await createVehicle.execute({
            fleetId:"0000",
            vehiclePlateNumber: "AZ458",
        });
        vehiclesCommandRepo.save(vehicles);
        getByPlateNumber = new GetByPlateNumber(vehiclesQueryRepo);
    })
    it("Should return a vehicle by plate number", async () => {
        const result = await getByPlateNumber.execute(vehicles.props.vehiclePlateNumber);
        expect(result.props.vehiclePlateNumber).toEqual("AZ458");
    })
})