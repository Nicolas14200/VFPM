import { User } from "../../entities/User";
import { Vehicles } from "../../entities/Vehicles";
import { CreateUser } from "../../useCases/user/CreateUser";
import { CreateVehicles } from "../../useCases/vehicles/CreateVehicles";
import { InMemoryUserCommandsRepository } from "../adapters/inMemory/commands/InMemoryUserCommandsRepository";
import { InMemoryVehiclesCommandRepository } from "../adapters/inMemory/commands/InMemoryVehiclesCommandRepository";
import {RegisterVehicles} from "../../useCases/utils/RegisterVehicles";
import { GetUserById } from "../../useCases/user/GetUserById";
import { InMemoryUserQueryRepository } from "../adapters/inMemory/queries/InMemoryUserQueryRepository";
import { UserError } from "../../models/errors/UserError";
import {user, vehicle01} from "./GenerateUtils";
describe('Unit - RegisterVehicles', () => {
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
    })
    it('Should register a vehicle in a fleet of user', async () => {
        const result = await registerVehicles.execute({
            userId: user.props.id, 
            vehiclesId :vehicles.props.id
        })
        expect(user.props.fleet.length).toEqual(1);
    })
    it('Should return an error if vehicle has already been registered into fleet', async () => {
        const result = registerVehicles.execute({
            userId: user.props.id, 
            vehiclesId :vehicles.props.id
        })
        expect(result).rejects.toThrow(UserError.VehiclesAlreadyExisting)
    })
    it('Should save the same vehicle can belong to more than one fleet', async () => {
        const anotherUser = await createUser.execute("Paul");
        await registerVehicles.execute({
            userId: anotherUser.props.id, 
            vehiclesId :vehicles.props.id
        })
        expect(anotherUser.props.fleet.length).toEqual(1);
    })
})