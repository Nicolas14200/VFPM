import { Vehicles } from "../../entities/Vehicles";

export interface VehiclesCommandRepository {
    save(vehicles: Vehicles) : Promise<Vehicles>;
    update(vehicles: Vehicles) : Promise<Vehicles>;
}