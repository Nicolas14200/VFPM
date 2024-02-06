import "reflect-metadata";
import { injectable } from "inversify";
import { VehiclesQueryRepository } from "../../../domain/repositories/vehicles/VehiclesQueryRepository";
import { Vehicles } from "../../../domain/entities/Vehicles";
import {
  MongoDbVehiclesMappper,
  MongoDbVehiclesMappperProps,
} from "../mappers/MongoDbVehiclesMapper";
import { vehiclesModel } from "../model/VehiclesModel";

@injectable()
export class MongoDbVehiclesQueryRepository implements VehiclesQueryRepository {
  private mongoDbVehiclesMappper: MongoDbVehiclesMappper =
    new MongoDbVehiclesMappper();

  async getById(id: string): Promise<Vehicles> {
    const result: MongoDbVehiclesMappperProps = await vehiclesModel.findOne({
      id: id,
    });

    if (!result) {
      return null;
    }
    return this.mongoDbVehiclesMappper.toDomain(result);
  }

  async getByPlateNumber(vehiclePlateNumber: string): Promise<Vehicles> {
    const result: MongoDbVehiclesMappperProps = await vehiclesModel.findOne({
      vehiclePlateNumber: vehiclePlateNumber,
    });

    if (!result) {
      return null;
    }
    return this.mongoDbVehiclesMappper.toDomain(result);
  }
}
