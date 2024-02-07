import { Fleet } from "../../entities/Fleet";

export interface FleetCommandRepository {
  save(fleet: Fleet): Promise<Fleet>;
  update(fleet: Fleet): Promise<Fleet>;
}
