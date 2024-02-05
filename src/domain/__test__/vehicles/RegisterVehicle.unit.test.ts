import 'reflect-metadata';
import {InMemoryFleetCommandRepository} from "../adapters/inMemory/commands/InMemoryFleetCommandRepository";
import {InMemoryFleetQueryRepository} from "../adapters/inMemory/queries/InMemoryFleetQueryRepository";
import { InMemoryVehiclesCommandRepository } from '../adapters/inMemory/commands/InMemoryVehiclesCommandRepository';
import { InMemoryVehiclesQueryRepository } from '../adapters/inMemory/queries/InMemoryVehiclesQueryRepository';
import { Fleet } from '../../entities/Fleet';
import { Vehicles } from '../../entities/Vehicles';
import { FleetError } from '../../models/errors/FleetError';
import { RegisterVehicles } from "../../useCases/vehicles/RegisterVehicles";
import { VehiclesError } from '../../models/errors/VehiclesError';

describe("Unit - RegisterVehicles", () => {

  let fleetMap: Map<string, Fleet>;
  let vehiclesMap: Map<string, Vehicles>;

  let fleet: Fleet;
  let vehicle: Vehicles;

  let fleetCommandRepo: InMemoryFleetCommandRepository;
  let fleetQueryRepo: InMemoryFleetQueryRepository;
  let vehiclesCommandRepo: InMemoryVehiclesCommandRepository;
  let vehiclesQueryRepo: InMemoryVehiclesQueryRepository;

  let registerVehicles: RegisterVehicles;

  beforeAll(async () => {
    fleetMap = new Map();
    vehiclesMap = new Map();

    fleet = Fleet.create();
    vehicle = Vehicles.create("userId", 'PlateNumber');

    fleetCommandRepo = new InMemoryFleetCommandRepository(fleetMap);
    fleetQueryRepo = new InMemoryFleetQueryRepository(fleetMap);
    vehiclesCommandRepo = new InMemoryVehiclesCommandRepository(vehiclesMap);
    vehiclesQueryRepo = new InMemoryVehiclesQueryRepository(vehiclesMap);

    registerVehicles = new RegisterVehicles(fleetQueryRepo, fleetCommandRepo, vehiclesQueryRepo);

    await vehiclesCommandRepo.save(vehicle);
    await fleetCommandRepo.save(fleet);
  });

  it("Should register a vehicle in a fleet", async () => {
    await registerVehicles.execute({
      fleetId: fleet.props.id,
      vehiclesId: vehicle.props.id,
    });
    expect(fleet.props.plateNumbers[0]).toEqual(vehicle.props.vehiclePlateNumber);
  });

  it("Should return an error if vehicle has already been registered into fleet", async () => {
    const result =  registerVehicles.execute({
      fleetId: fleet.props.id,
      vehiclesId: vehicle.props.id,
    });
    expect(result).rejects.toThrow(FleetError.VehiclesAlreadyExisting)

  });

  it("Should save the same vehicle can belong to more than one fleet", async () => {
    const anotherFleet = Fleet.create();
    await fleetCommandRepo.save(anotherFleet);
    await registerVehicles.execute({
      fleetId: anotherFleet.props.id,
      vehiclesId: vehicle.props.id,
    });
    expect(anotherFleet.props.plateNumbers[0]).toEqual(vehicle.props.vehiclePlateNumber);
  });

  it("Should return an error if vehicle or fleet not exist", async () => {
    const result01 =  registerVehicles.execute({
      fleetId: "fake id",
      vehiclesId: vehicle.props.id,
    });
    const result02 =  registerVehicles.execute({
      fleetId: fleet.props.id,
      vehiclesId: "fake id",
    });
    expect(result01).rejects.toThrow(VehiclesError.RegisterVehiclesFailed)
    expect(result02).rejects.toThrow(VehiclesError.RegisterVehiclesFailed)

  });
});
