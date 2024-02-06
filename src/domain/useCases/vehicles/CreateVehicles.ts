import {  injectable } from "inversify";
import { Vehicles } from "../../entities/Vehicles";
import { Usecase } from "../../models/Usecase";

export interface CreateVehiclesProps {
  fleetId: string, 
  vehiclePlateNumber:string
}

@injectable()
export class CreateVehicles implements Usecase<CreateVehiclesProps, Vehicles> {

  async execute(payload: CreateVehiclesProps): Promise<Vehicles> {
    const vehicle = Vehicles.create(payload.fleetId, payload.vehiclePlateNumber);
    return vehicle;
  }
}
