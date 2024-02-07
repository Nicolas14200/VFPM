import "reflect-metadata";
import { InMemoryFleetCommandRepository } from "../infra/inMemory/commands/InMemoryFleetCommandRepository";
import { InMemoryFleetQueryRepository } from "../infra/inMemory/queries/InMemoryFleetQueryRepository";
import { InMemoryVehiclesCommandRepository } from "../infra/inMemory/commands/InMemoryVehiclesCommandRepository";
import { InMemoryVehiclesQueryRepository } from "../infra/inMemory/queries/InMemoryVehiclesQueryRepository";
import { Fleet } from "../../entities/Fleet";
import { Vehicles } from "../../entities/Vehicles";
import { FleetError } from "../../models/errors/FleetError";
import { RegisterVehicles } from "../../useCases/vehicles/RegisterVehicles";
import { VehiclesError } from "../../models/errors/VehiclesError";
import { CreateVehicles } from "../../useCases/vehicles/CreateVehicles";

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
  let createVehicule: CreateVehicles;
  beforeAll(async () => {
    fleetMap = new Map();
    vehiclesMap = new Map();

    fleet = Fleet.create();
    vehicle = Vehicles.create("userId", "PlateNumber");

    fleetCommandRepo = new InMemoryFleetCommandRepository(fleetMap);
    fleetQueryRepo = new InMemoryFleetQueryRepository(fleetMap);
    vehiclesCommandRepo = new InMemoryVehiclesCommandRepository(vehiclesMap);
    vehiclesQueryRepo = new InMemoryVehiclesQueryRepository(vehiclesMap);

    createVehicule = new CreateVehicles();
    registerVehicles = new RegisterVehicles(
      fleetQueryRepo,
      fleetCommandRepo,
      vehiclesCommandRepo,
      createVehicule
    );

    await vehiclesCommandRepo.save(vehicle);
    await fleetCommandRepo.save(fleet);
  });

  it("Should register a vehicle in a fleet", async () => {
    await registerVehicles.execute({
      fleetId: fleet.props.id,
      vehiclePlateNumber: vehicle.props.vehiclePlateNumber,
    });
    expect(fleet.props.plateNumbers[0]).toEqual(
      vehicle.props.vehiclePlateNumber
    );
  });

  it("Should return an error if vehicle has already been registered into fleet", async () => {
    const fleet02 = Fleet.create();
    fleetCommandRepo.save(fleet02);
    const vehicles02 = Vehicles.create(fleet02.props.id, "AAA");
    fleet02.addVehicle(vehicles02.props.vehiclePlateNumber);

    const result = registerVehicles.execute({
      fleetId: fleet02.props.id,
      vehiclePlateNumber: vehicles02.props.vehiclePlateNumber,
    });
    expect(result).rejects.toThrow(FleetError.VehiclesAlreadyExisting);
  });

  it("Should save the same vehicle can belong to more than one fleet", async () => {
    const anotherFleet = Fleet.create();
    await fleetCommandRepo.save(anotherFleet);
    await registerVehicles.execute({
      fleetId: anotherFleet.props.id,
      vehiclePlateNumber: vehicle.props.vehiclePlateNumber,
    });

    expect(anotherFleet.props.plateNumbers[0]).toEqual(
      vehicle.props.vehiclePlateNumber
    );
  });

  it("Should return an error if fleet not exist", async () => {
    const result01 = registerVehicles.execute({
      fleetId: "fake id",
      vehiclePlateNumber: vehicle.props.vehiclePlateNumber,
    });

    expect(result01).rejects.toThrow(VehiclesError.RegisterVehiclesFailed);
  });
});
