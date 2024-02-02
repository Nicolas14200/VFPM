import { Vehicles } from "../../../../entities/Vehicles";
import { VehiclesQueryRepository } from "../../../../repositories/vehicles/VehiclesQueryRepository";

export class InMemoryVehiclesQueryRepository implements VehiclesQueryRepository {
    constructor(readonly vehiclesMap: Map<string, Vehicles>) { }
    async getById(id: string): Promise<Vehicles> {
        const vehicles: Vehicles = this.vehiclesMap.get(id);
        return vehicles;
    }

}
