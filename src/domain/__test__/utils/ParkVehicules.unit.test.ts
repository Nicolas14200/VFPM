import 'reflect-metadata';
import { User } from "../../entities/User";
import { Vehicles } from "../../entities/Vehicles";
import { CreateUser } from "../../useCases/user/CreateUser";
import { GetUserById } from "../../useCases/user/GetUserById";
import { RegisterVehicles } from "../../useCases/utils/RegisterVehicles";
import { CreateVehicles } from "../../useCases/vehicles/CreateVehicles";
import { InMemoryUserCommandsRepository } from "../adapters/inMemory/commands/InMemoryUserCommandsRepository";
import { InMemoryVehiclesCommandRepository } from "../adapters/inMemory/commands/InMemoryVehiclesCommandRepository";
import { InMemoryUserQueryRepository } from "../adapters/inMemory/queries/InMemoryUserQueryRepository";
import {ParkVehicles} from "../../useCases/utils/ParkVehicules";
import { GetVehiclesById } from "../../useCases/vehicles/GetVehiclesById";
import { InMemoryVehiclesQueryRepository } from "../adapters/inMemory/queries/InMemoryVehiclesQueryRepository";
import { VehiclesError } from "../../models/errors/VehiclesError";

describe("Unit - ParkVehicules", () => {
    let userMap: Map<string, User>;
    let vehiclesMap: Map<string, Vehicles>;
    let userCommandRepo: InMemoryUserCommandsRepository;
    let userQueryRepo: InMemoryUserQueryRepository;
    let vehiclesCommandRepo: InMemoryVehiclesCommandRepository;
    let createUser: CreateUser;
    let createVehicle : CreateVehicles;
    let registerVehicles: RegisterVehicles;
    let getUserById: GetUserById;
    let user: User;
    let vehicles: Vehicles;
    let parkVehicles: ParkVehicles;
    let getVehiclesById: GetVehiclesById;
    let vehiclesQueryRepo: InMemoryVehiclesQueryRepository;

    beforeAll (async ()=> {
        userMap = new Map();
        vehiclesMap = new Map();
        userCommandRepo = new InMemoryUserCommandsRepository(userMap); 
        userQueryRepo = new InMemoryUserQueryRepository(userMap);
        vehiclesCommandRepo = new InMemoryVehiclesCommandRepository(vehiclesMap);
        createVehicle = new CreateVehicles(vehiclesCommandRepo);
        createUser = new CreateUser(userCommandRepo);
        getUserById = new GetUserById(userQueryRepo);
        registerVehicles = new RegisterVehicles(userCommandRepo, getUserById);
        user = await createUser.execute("Nico");
        vehicles = await createVehicle.execute(user.props.id);
        await registerVehicles.execute({
            userId: user.props.id, 
            vehiclesId :vehicles.props.id
        });
        vehiclesQueryRepo = new InMemoryVehiclesQueryRepository(vehiclesMap);
        getVehiclesById = new GetVehiclesById(vehiclesQueryRepo);
        parkVehicles = new ParkVehicles(getUserById, getVehiclesById, vehiclesCommandRepo);
    })
    it("Should park vehicles", async () => {
        const result = await parkVehicles.execute({
            position: {
                lat:10,
                lng:10
            },
            userId: user.props.id,
            vehiculeId: vehicles.props.id
        })
        expect(result.props.positions?.length).toEqual(1);
    })

    it("Should return an error if vehicle is already parked at this location.", async () => {
        const result = parkVehicles.execute({
            position: {
                lat:10,
                lng:10
            },
            userId: user.props.id,
            vehiculeId: vehicles.props.id
        })
        expect(result).rejects.toThrow(VehiclesError.VehiclesAlreadyParkAtLocation);
    })
})