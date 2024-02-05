import { Fleet } from "../../../domain/entities/Fleet";
import { Mapper } from "../../../domain/models/Mapper";

export interface MongoDbVehiclesMappperProps {
    id: string;
    plateNumbers: string[];
}

export class MongoDbFleetMappper implements Mapper<Fleet, MongoDbVehiclesMappperProps>{
  toDomain(raw: MongoDbVehiclesMappperProps): Fleet {
    return new Fleet({
        id: raw.id,
        plateNumbers: raw.plateNumbers.map((plateNum) => plateNum)
    });
  }
}