export class VFPMIdentifiers {
    static readonly userCommandRepository = Symbol.for("userCommandRepository");
    static readonly userQueryRepository = Symbol.for("userQueryRepository");
    static readonly vehiclesCommandRepository = Symbol.for("vehiclesCommandRepository");
    static readonly vehiclesQueryRepository = Symbol.for("vehiclesQueryRepository");
    static readonly fleetCommandRepository = Symbol.for("fleetCommandRepository");
    static readonly fleetQueryRepository = Symbol.for("fleetQueryRepository");
    static readonly getUserById = Symbol.for("getUserById");
    static readonly getVehiclesById = Symbol.for("getVehiclesById");
}