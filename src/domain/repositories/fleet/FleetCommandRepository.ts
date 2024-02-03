import { Fleet } from "../../entities/Fleet";

export interface FleetCommandRepository {
    save(user: Fleet) : Promise<Fleet>;
}