import { User } from "../../../domain/entities/User";
import { Mapper } from "../../../domain/models/Mapper";

export interface MongoDbUserMappperProps {
    id: string;
    name: string;
    fleet: string[];
}

export class MongoDbUserMappper implements Mapper<User, MongoDbUserMappperProps>{
  toDomain(raw: MongoDbUserMappperProps): User {
    return new User({
        id: raw.id,
        name: raw.name,
        fleet: raw.fleet,
    });
  }
}