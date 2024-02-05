import { Vehicles } from "../../../domain/entities/Vehicles";
import { Mapper } from "../../../domain/models/Mapper";
import { Position } from "../../../domain/valuesObject/Position";

export interface MongoDbVehiclesMappperProps {
    id: string;
    userId: string;
    positions: Position[];
    vehiclePlateNumber:string;
}

export class MongoDbVehiclesMappper implements Mapper<Vehicles, MongoDbVehiclesMappperProps>{
  toDomain(raw: MongoDbVehiclesMappperProps): Vehicles {
    return new Vehicles({
        id: raw.id,
        userId: raw.userId,
        positions: raw.positions.map((pos) => pos),
        vehiclePlateNumber: raw.vehiclePlateNumber
    });
  }
}