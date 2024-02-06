import { DomainError } from "./DomainError";

export namespace VehiclesError {
    export class VehiclesAlreadyExisting extends DomainError{}
    export class VehiclesAlreadyParkAtLocation extends DomainError{}
    export class RegisterVehiclesFailed extends DomainError{}
    export class VehiclesNotFound extends DomainError{}
    export class PlateNumberNotFound extends DomainError{}
}