import "reflect-metadata";
import mongoose from "mongoose";
import { MongoDbVehiclesCommandRepository } from "../mongoDb/commands/MongoDbVehiclesCommandRepository";
import { Vehicles } from "../../domain/entities/Vehicles";
import { MongoDbVehiclesQueryRepository } from "../mongoDb/queries/MongoDbVehiculesQueryRepository";
import { v4 } from "uuid";

describe("Integration - MongoDbUserCommandRepository", () => {
  let vehiclesCommandRepo: MongoDbVehiclesCommandRepository;
  let vehiclesQueryRepo: MongoDbVehiclesQueryRepository;
  let vehicles: Vehicles;

  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/VFPM");
    vehiclesCommandRepo = new MongoDbVehiclesCommandRepository();
    vehiclesQueryRepo = new MongoDbVehiclesQueryRepository();
    vehicles = Vehicles.create("fleetId", v4());
    vehicles.addPosition(1, 2, 3);
  });

  it("Should save a vehicles", async () => {
    await vehiclesCommandRepo.save(vehicles);
    const result = await vehiclesQueryRepo.getById(vehicles.props.id);
    expect(result.props.vehiclePlateNumber).toEqual(
      vehicles.props.vehiclePlateNumber
    );
    expect(result.props.positions.length).toEqual(1);
  });

  it("Should return null if vehicles doesn't exist (usecase getById)", async () => {
    const result = await vehiclesQueryRepo.getById("");
    expect(result).toBeFalsy();
  });

  it("Should return a vehicle by plate number", async () => {
    const result = await vehiclesQueryRepo.getByPlateNumber(
      vehicles.props.vehiclePlateNumber
    );
    expect(result.props.vehiclePlateNumber).toEqual(
      vehicles.props.vehiclePlateNumber
    );
  });

  it("Should update a vehicle ", async () => {
    vehicles.addPosition(10, 10, 10);
    const result = await vehiclesCommandRepo.update(vehicles);
    expect(result.props.positions[1].lng).toEqual(10);
  });

  it("Should return null if vehicles doesn't exist (usecase getByPlatNumber)", async () => {
    const result = await vehiclesQueryRepo.getByPlateNumber("");
    expect(result).toBeFalsy();
  });
});
