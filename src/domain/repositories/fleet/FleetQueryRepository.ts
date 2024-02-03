import { Fleet } from "../../entities/Fleet";

export interface FleetQueryRepository {
    getById(id: string) : Promise<Fleet>;
}