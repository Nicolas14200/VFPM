import { Vehicles } from "../../entities/Vehicles";

export interface VehiclesQueryRepository {
    getById(id: string) : Promise<Vehicles>;
}