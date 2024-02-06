import { Vehicles } from "../../../../entities/Vehicles";
import { VehiclesCommandRepository } from "../../../../repositories/vehicles/VehiclesCommandRepository";

export class InMemoryVehiclesCommandRepository implements VehiclesCommandRepository{

    constructor(readonly vehiclesMap: Map<string, Vehicles>) { }
    
    async save(vehicles: Vehicles): Promise<Vehicles> {
        this.vehiclesMap.set(vehicles.props.id, vehicles);
        return vehicles;
    }

    async update(vehicles: Vehicles): Promise<Vehicles> {
        this.vehiclesMap.set(vehicles.props.id, vehicles);
        return vehicles;
    }
    
}