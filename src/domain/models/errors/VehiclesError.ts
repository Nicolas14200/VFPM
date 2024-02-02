import { DomainError } from "./DomainError";

export namespace VehiclesError {
    export class VehiclesAlreadyExisting extends DomainError{}
    export class VehiclesAlreadyParkAtLocation extends DomainError{}
   }