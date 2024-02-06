import { Vehicles } from "../../../../entities/Vehicles";
import { VehiclesError } from "../../../../models/errors/VehiclesError";
import { VehiclesQueryRepository } from "../../../../repositories/vehicles/VehiclesQueryRepository";

export class InMemoryVehiclesQueryRepository implements VehiclesQueryRepository {
    constructor(readonly vehiclesMap: Map<string, Vehicles>) { }

    async getById(id: string): Promise<Vehicles> {
        const vehicles: Vehicles = this.vehiclesMap.get(id);
        return vehicles;
    }

    async getByPlateNumber(plateNumber: string): Promise<Vehicles> {
        for (const vehicle of this.vehiclesMap.values()) {
            if (vehicle.props.vehiclePlateNumber === plateNumber) {
                return vehicle;
            }
        }
        throw new VehiclesError.PlateNumberNotFound("Plate Number Not Found")
    }

}
