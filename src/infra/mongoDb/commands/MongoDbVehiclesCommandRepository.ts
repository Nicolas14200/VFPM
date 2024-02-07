import "reflect-metadata";
import { Vehicles } from "../../../domain/entities/Vehicles";
import { injectable } from "inversify";
import { VehiclesCommandRepository } from "../../../domain/repositories/vehicles/VehiclesCommandRepository";
import { vehiclesModel } from "../model/VehiclesModel";

@injectable()
export class MongoDbVehiclesCommandRepository
  implements VehiclesCommandRepository
{
  async save(vehicles: Vehicles): Promise<Vehicles> {
    const newModel = new vehiclesModel({
      id: vehicles.props.id,
      fleetId: vehicles.props.fleetId,
      vehiclePlateNumber: vehicles.props.vehiclePlateNumber,
      positions: vehicles.props.positions.map((pos) => {
        return pos;
      }),
    });
    await newModel.save();
    return vehicles;
  }

  async update(vehicles: Vehicles): Promise<Vehicles> {
    await vehiclesModel.findOneAndUpdate(
      {
        id: vehicles.props.id,
      },
      {
        $set: {
          positions: vehicles.props.positions.map((pos) => pos),
        },
      },
      {
        upsert: true,
      }
    );
    return vehicles;
  }
}
