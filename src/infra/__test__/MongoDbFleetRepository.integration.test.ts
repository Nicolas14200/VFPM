import 'reflect-metadata';
import mongoose from "mongoose";
import { MongoDbFleetCommandRepository } from "../mongoDb/commands/MongoDbFleetCommandRepository";
import { Fleet } from "../../domain/entities/Fleet";
import { MongoDbFleetQueryRepository } from "../mongoDb/queries/MongoDbFleetQueryRepository";

describe("Integration - MongoDbUserCommandRepository", () => {
  let fleetCommandRepo: MongoDbFleetCommandRepository;
  let fleetQueryRepo: MongoDbFleetQueryRepository;
  let fleet: Fleet;

  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/VFPM");
    fleetCommandRepo = new MongoDbFleetCommandRepository();
    fleetQueryRepo = new MongoDbFleetQueryRepository();
    fleet = Fleet.create();
    fleet.addVehicle("0000");
  });

  it("Should save a fleet", async () => {
    await fleetCommandRepo.save(fleet);
    const result = await fleetQueryRepo.getById(fleet.props.id);
    expect(result.props.id).toBeDefined();
  });

  it("Should return null if fleet doesn't exist", async () => {
    const result = await fleetQueryRepo.getById("");
    expect(result).toBeFalsy();
  });

  it("Should update fleet", async () => {
    fleet.addVehicle('AZERTY');
    await fleetCommandRepo.update(fleet);
    const result = await fleetQueryRepo.getById(fleet.props.id);
    expect(result.props.plateNumbers[1]).toEqual('AZERTY')
  });
});
