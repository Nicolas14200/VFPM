import 'reflect-metadata';
import {Vehicles} from "../../entities/Vehicles";
import { CreateVehicles } from "../../useCases/vehicles/CreateVehicles";

describe('Unit - CreateVehicle', () => {
    let vehiclesMap: Map<string, Vehicles>;
    let createVehicle : CreateVehicles;

    beforeAll(() => {
        createVehicle = new CreateVehicles();
    })
    it("Should create vehicles", async () => {
        const result = await createVehicle.execute({
            fleetId:"0000",
            vehiclePlateNumber:"AZ458",
        });
        expect(result.props.fleetId[0]).toEqual("0000");
        expect(result.props.vehiclePlateNumber).toEqual("AZ458");
        expect(result.props.id).toBeDefined();
        expect(result.props.positions).toBeDefined();
    })

})