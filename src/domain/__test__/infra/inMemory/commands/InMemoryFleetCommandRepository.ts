import { Fleet } from "../../../../entities/Fleet";
import { FleetCommandRepository } from "../../../../repositories/fleet/FleetCommandRepository";

export class InMemoryFleetCommandRepository implements FleetCommandRepository {
  constructor(readonly fleetMap: Map<string, Fleet>) {}

  async save(fleet: Fleet): Promise<Fleet> {
    this.fleetMap.set(fleet.props.id, fleet);
    return fleet;
  }

  async update(fleet: Fleet): Promise<Fleet> {
    this.fleetMap.set(fleet.props.id, fleet);
    return fleet;
  }
}
