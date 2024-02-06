import { DomainError } from "./DomainError";

export namespace UserError {
    export class VehiclesAlreadyExisting extends DomainError{}
    export class GetByIdFailed extends DomainError{}
    export class UserNotFound extends DomainError{}
   }