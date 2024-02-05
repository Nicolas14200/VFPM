import { DomainError } from "./DomainError";

export namespace FleetError {
    export class VehiclesAlreadyExisting extends DomainError{}
    export class FleetNotFound extends DomainError{}
   }