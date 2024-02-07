import { Container } from "inversify";
import mongoose from "mongoose";
import { VFPMIdentifiers } from "../../domain/models/VFPMIdentifiers";
import { CreateUser } from "../../domain/useCases/user/CreateUser";
import { CreateVehicles } from "../../domain/useCases/vehicles/CreateVehicles";
import { Controller } from "../Controller";
import { CreateFleet } from "../../domain/useCases/fleet/CreateFleet";
import { AsignFleet } from "../../domain/useCases/user/AsignFleet";
import { ParkVehicles } from "../../domain/useCases/vehicles/ParkVehicules";
import { RegisterVehicles } from "../../domain/useCases/vehicles/RegisterVehicles";
import { MongoDbUserCommandRepository } from "../../infra/mongoDb/commands/MongoDbUserCommandRepository";
import { MongoDbUserQueryRepository } from "../../infra/mongoDb/queries/MongoDbUserQueryRepository";
import { MongoDbVehiclesCommandRepository } from "../../infra/mongoDb/commands/MongoDbVehiclesCommandRepository";
import { MongoDbVehiclesQueryRepository } from "../../infra/mongoDb/queries/MongoDbVehiculesQueryRepository";
import { MongoDbFleetCommandRepository } from "../../infra/mongoDb/commands/MongoDbFleetCommandRepository";
import { MongoDbFleetQueryRepository } from "../../infra/mongoDb/queries/MongoDbFleetQueryRepository";
import { GetByPlateNumber } from "../../domain/useCases/vehicles/GetByPlateNumber";

export class AppDependencies extends Container {
  async init() {
    mongoose.connect("mongodb://127.0.0.1:27017/VFPM");
    this.bind(VFPMIdentifiers.userCommandRepository).toConstantValue(
      new MongoDbUserCommandRepository()
    );
    this.bind(VFPMIdentifiers.userQueryRepository).toConstantValue(
      new MongoDbUserQueryRepository()
    );
    this.bind(CreateUser).toSelf();
    this.bind(AsignFleet).toSelf();

    this.bind(VFPMIdentifiers.vehiclesCommandRepository).toConstantValue(
      new MongoDbVehiclesCommandRepository()
    );
    this.bind(VFPMIdentifiers.vehiclesQueryRepository).toConstantValue(
      new MongoDbVehiclesQueryRepository()
    );
    this.bind(CreateVehicles).toSelf();
    this.bind(ParkVehicles).toSelf();
    this.bind(RegisterVehicles).toSelf();
    this.bind(GetByPlateNumber).toSelf();

    this.bind(VFPMIdentifiers.fleetCommandRepository).toConstantValue(
      new MongoDbFleetCommandRepository()
    );
    this.bind(VFPMIdentifiers.fleetQueryRepository).toConstantValue(
      new MongoDbFleetQueryRepository()
    );
    this.bind(CreateFleet).toSelf();

    this.bind(Controller).toSelf();
    const controller = this.get<Controller>(Controller);
    controller.configure();
    return this;
  }
}
