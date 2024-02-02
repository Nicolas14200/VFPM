import { DomainError } from "./DomainError";

export namespace UserError {
    export class VehiclesAlreadyExisting extends DomainError{}
   }