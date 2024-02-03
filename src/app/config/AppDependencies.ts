import { Container } from "inversify";
import { VFPMIdentifiers } from "../../domain/useCases/VFPMIdentifiers";
import { User } from "../../domain/entities/User";
import { Vehicles } from "../../domain/entities/Vehicles";
import { CreateUser } from "../../domain/useCases/user/CreateUser";
import { CreateVehicles } from "../../domain/useCases/vehicles/CreateVehicles";
import { CommanderConfig } from "./configureCommand";

let userMap: Map<string, User> = new Map();
let vehiclesMap: Map<string, Vehicles> = new Map();

export class AppDependencies extends Container {
    async init() {
        this.bind(VFPMIdentifiers.userCommandRepository).toConstantValue(userMap);
        this.bind(VFPMIdentifiers.userQueryRepository).toConstantValue(userMap);
        this.bind(VFPMIdentifiers.vehiclesCommandRepository).toConstantValue(vehiclesMap);
        this.bind(VFPMIdentifiers.vehiclesQueryRepository).toConstantValue(vehiclesMap);
        this.bind(VFPMIdentifiers.getUserById).toSelf();
        this.bind(VFPMIdentifiers.getVehiclesById).toSelf();
        this.bind(CreateUser).toSelf();
        this.bind(CreateVehicles).toSelf();
        this.bind(CommanderConfig).toSelf();
        return this;
    }
}