import "reflect-metadata";
import { AppDependencies } from "../config/AppDependencies";
import { Controller } from "../Controller";
import { CreateUser } from "../../domain/useCases/user/CreateUser";
import { AsignFleet } from "../../domain/useCases/user/AsignFleet";
import { CreateFleet } from "../../domain/useCases/fleet/CreateFleet";
import { ParkVehicles } from "../../domain/useCases/vehicles/ParkVehicules";
import { GetByPlateNumber } from "../../domain/useCases/vehicles/GetByPlateNumber";
import { RegisterVehicles } from "../../domain/useCases/vehicles/RegisterVehicles";
import { MongoDbUserCommandRepository } from "../../infra/mongoDb/commands/MongoDbUserCommandRepository";
import { MongoDbUserQueryRepository } from "../../infra/mongoDb/queries/MongoDbUserQueryRepository";
import { MongoDbVehiclesCommandRepository } from "../../infra/mongoDb/commands/MongoDbVehiclesCommandRepository";
import { MongoDbVehiclesQueryRepository } from "../../infra/mongoDb/queries/MongoDbVehiculesQueryRepository";
import { MongoDbFleetCommandRepository } from "../../infra/mongoDb/commands/MongoDbFleetCommandRepository";
import { MongoDbFleetQueryRepository } from "../../infra/mongoDb/queries/MongoDbFleetQueryRepository";
import { CreateVehicles } from "../../domain/useCases/vehicles/CreateVehicles";
import mongoose from "mongoose";


describe("e2e - Controller", () => {
  let controller: Controller;
  let createUser: CreateUser;
  let createFleet: CreateFleet;
  let asignFleet: AsignFleet;
  let registerVehicles: RegisterVehicles;
  let parkVehicles: ParkVehicles;
  let getByPlateNumber: GetByPlateNumber;
  let userCommandRepo: MongoDbUserCommandRepository;
  let userQueryRepo: MongoDbUserQueryRepository;
  let vehiclesCommandRepo: MongoDbVehiclesCommandRepository;
  let vehiclesQueryRepo: MongoDbVehiclesQueryRepository;
  let fleetCommandRepo: MongoDbFleetCommandRepository;
  let fleetQueryRepo: MongoDbFleetQueryRepository;
  let createVehicle: CreateVehicles;
  beforeAll(async () => {
    userCommandRepo = new MongoDbUserCommandRepository();
    userQueryRepo = new MongoDbUserQueryRepository();
    vehiclesCommandRepo = new MongoDbVehiclesCommandRepository();
    vehiclesQueryRepo = new MongoDbVehiclesQueryRepository();
    fleetCommandRepo = new MongoDbFleetCommandRepository();
    fleetQueryRepo = new MongoDbFleetQueryRepository();
    createVehicle = new CreateVehicles();
    createUser = new CreateUser(userCommandRepo);
    createFleet = new CreateFleet(fleetCommandRepo);
    asignFleet = new AsignFleet(userQueryRepo, userCommandRepo);
    registerVehicles = new RegisterVehicles(
      fleetQueryRepo,
      fleetCommandRepo,
      vehiclesCommandRepo,
      createVehicle
    );
    parkVehicles = new ParkVehicles(vehiclesQueryRepo, vehiclesCommandRepo);
    getByPlateNumber = new GetByPlateNumber(vehiclesQueryRepo);
    controller = new Controller(
      createUser,
      createFleet,
      asignFleet,
      registerVehicles,
      parkVehicles,
      getByPlateNumber
    );
    //await controller.configure();
    //mongoose.connect('mongodb://127.0.0.1:27017/VFPM');
  });

  it("should create a user", async () => {});

  it("should create a fleet", async () => {});
});
