import { Fleet } from "../../../../entities/Fleet";
import { FleetQueryRepository } from "../../../../repositories/fleet/FleetQueryRepository";

export class InMemoryFleetQueryRepository implements FleetQueryRepository {

    constructor(readonly fleetMap: Map<string, Fleet>) { }

    async getById(id: string): Promise<Fleet> {

        const fleet: Fleet = this.fleetMap.get(id);
        return fleet;
    }
}