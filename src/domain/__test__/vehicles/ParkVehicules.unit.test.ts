import 'reflect-metadata';
import { VehiclesError } from "../../models/errors/VehiclesError";
import { User } from "../../entities/User";
import { Vehicles } from "../../entities/Vehicles";
import { Fleet } from '../../entities/Fleet';
import { CreateUser } from "../../useCases/user/CreateUser";
import { RegisterVehicles } from "../../useCases/vehicles/RegisterVehicles";
import { CreateVehicles } from "../../useCases/vehicles/CreateVehicles";
import {ParkVehicles} from "../../useCases/vehicles/ParkVehicules";
import {AsignFleet} from "../../useCases/user/AsignFleet";
import { InMemoryUserCommandRepository } from "../infra/inMemory/commands/InMemoryUserCommandRepository";
import { InMemoryVehiclesCommandRepository } from "../infra/inMemory/commands/InMemoryVehiclesCommandRepository";
import { InMemoryUserQueryRepository } from "../infra/inMemory/queries/InMemoryUserQueryRepository";
import { InMemoryVehiclesQueryRepository } from "../infra/inMemory/queries/InMemoryVehiclesQueryRepository";
import { InMemoryFleetQueryRepository } from '../infra/inMemory/queries/InMemoryFleetQueryRepository';
import { InMemoryFleetCommandRepository } from '../infra/inMemory/commands/InMemoryFleetCommandRepository';

describe("Unit - ParkVehicules", () => {

    let userMap: Map<string, User>;
    let vehiclesMap: Map<string, Vehicles>;
    let fleetMap: Map<string, Fleet>;

    let userCommandRepo: InMemoryUserCommandRepository;
    let userQueryRepo: InMemoryUserQueryRepository;

    let vehiclesCommandRepo: InMemoryVehiclesCommandRepository;
    let vehiclesQueryRepo: InMemoryVehiclesQueryRepository;

    let fleetCommandRepo: InMemoryFleetCommandRepository;
    let fleetQueryRepo: InMemoryFleetQueryRepository;

    let user: User;
    let vehicles: Vehicles;
    let fleet: Fleet;

    let createUser: CreateUser;
    let createVehicle: CreateVehicles;

    let asignFleet: AsignFleet;

    let registerVehicles: RegisterVehicles;
    let parkVehicles: ParkVehicles;

    beforeAll (async ()=> {
        userMap = new Map();
        vehiclesMap = new Map();
        fleetMap = new Map();

        userCommandRepo = new InMemoryUserCommandRepository(userMap); 
        userQueryRepo = new InMemoryUserQueryRepository(userMap);

        vehiclesCommandRepo = new InMemoryVehiclesCommandRepository(vehiclesMap);
        vehiclesQueryRepo = new InMemoryVehiclesQueryRepository(vehiclesMap);

        fleetCommandRepo = new InMemoryFleetCommandRepository(fleetMap);
        fleetQueryRepo = new InMemoryFleetQueryRepository(fleetMap);

        createUser = new CreateUser(userCommandRepo);
        createVehicle = new CreateVehicles();

        asignFleet = new AsignFleet(userQueryRepo, userCommandRepo);
        
        registerVehicles = new RegisterVehicles(fleetQueryRepo, fleetCommandRepo, vehiclesCommandRepo, createVehicle);  
        parkVehicles = new ParkVehicles(vehiclesQueryRepo, vehiclesCommandRepo);

        user = await createUser.execute("Nico");

        vehicles = await createVehicle.execute({
            fleetId:"0000",
            vehiclePlateNumber:"AZ458",
        });
        vehiclesCommandRepo.save(vehicles);
        
        fleet = Fleet.create();
        await fleetCommandRepo.save(fleet);

        await asignFleet.execute({
            fleetId: fleet.props.id,
            userId: user.props.id,
        })
 
        await registerVehicles.execute({
            fleetId: fleet.props.id, 
            vehiclePlateNumber: vehicles.props.vehiclePlateNumber,
        });
    })

    it("Should park vehicles", async () => {
        const result = await parkVehicles.execute({
            position: {
                lat:10,
                lng:10, 
                alt: 1
            },
            vehiculeId: vehicles.props.id
        })
        expect(result.props.positions.length).toEqual(1);
        expect(result.props.positions[0].lat).toEqual(10);
        expect(result.props.positions[0].alt).toEqual(1);
    })

    it("Should return an error if vehicle is already parked at this location.", async () => {
        const result = parkVehicles.execute({
            position: {
                lat:10,
                lng:10,
                alt: 1
            },
            vehiculeId: vehicles.props.id
        })
        expect(result).rejects.toThrow(VehiclesError.VehiclesAlreadyParkAtLocation);
    })

    it("Should return an error if vehicle not founds.", async () => {
        const result = parkVehicles.execute({
            position: {
                lat:10,
                lng:10,
                alt: 1
            },
            vehiculeId: "fake ID"
        })
        expect(result).rejects.toThrow(VehiclesError.VehiclesNotFound);
    })
})