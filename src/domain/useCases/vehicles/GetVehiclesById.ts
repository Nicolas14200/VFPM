import { inject, injectable } from "inversify";
import { Vehicles } from "../../entities/Vehicles";
import { VehiclesQueryRepository } from "../../repositories/vehicles/VehiclesQueryRepository";
import { Usecase } from "../Usecase";
import { VFPMIdentifiers } from "../VFPMIdentifiers";

@injectable()
export class GetVehiclesById implements Usecase<string, Vehicles> {
    constructor(
        @inject(VFPMIdentifiers.vehiclesQueryRepository)
        private readonly vehiclesQueryRepository: VehiclesQueryRepository
      ) {}
    async execute(id: string): Promise<Vehicles> {
        return await this.vehiclesQueryRepository.getById(id);
    }

}