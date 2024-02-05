import "reflect-metadata";
import { FleetQueryRepository } from "../../../domain/repositories/fleet/FleetQueryRepository";
import { injectable } from "inversify";
import { Fleet } from "../../../domain/entities/Fleet";
import { fleetModel } from "../model/FleetModel";
import { MongoDbFleetMappper, MongoDbVehiclesMappperProps } from "../mappers/MongoDbFleetMapper";

@injectable()
export class MongoDbFleetQueryRepository implements FleetQueryRepository {
  private mongoDbfleetMappper: MongoDbFleetMappper = new MongoDbFleetMappper();

  async getById(id: string): Promise<Fleet> {
    const result: MongoDbVehiclesMappperProps = await fleetModel.findOne({
      id: id,
    });
    if (!result) {
      return null;
    }
    return this.mongoDbfleetMappper.toDomain(result);

  }
}
