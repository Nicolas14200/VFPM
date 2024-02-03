import 'reflect-metadata';
import {Vehicles} from "../../entities/Vehicles";
import { CreateVehicles } from "../../useCases/vehicles/CreateVehicles";
import {InMemoryVehiclesCommandRepository} from "../adapters/inMemory/commands/InMemoryVehiclesCommandRepository";

describe('Unit - CreateVehicle', () => {
    let vehiclesMap: Map<string, Vehicles>;
    let createVehicle : CreateVehicles;
    let vehiclesCommandRepo: InMemoryVehiclesCommandRepository;

    beforeAll(() => {
        vehiclesMap = new Map();
        vehiclesCommandRepo = new InMemoryVehiclesCommandRepository(vehiclesMap);
        createVehicle = new CreateVehicles(vehiclesCommandRepo);
    })
    it("Should create vehicles", async () => {
        const result = await createVehicle.execute({
            userId:"0000",
            vehiclePlateNumber:"AZ458",
        });
        expect(result.props.userId).toEqual("0000");
        expect(result.props.vehiclePlateNumber).toEqual("AZ458");
        expect(result.props.id).toBeDefined();
        expect(result.props.positions).toBeDefined();
    })

})