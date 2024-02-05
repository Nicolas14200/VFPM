import { FleetCommandRepository } from '../../../domain/repositories/fleet/FleetCommandRepository';
import { Fleet } from '../../../domain/entities/Fleet';
import { injectable } from 'inversify';
import { fleetModel } from '../model/FleetModel';

@injectable()
export class MongoDbFleetCommandRepository implements FleetCommandRepository {
    
    async save(fleet: Fleet): Promise<Fleet> {
        const newModel = new fleetModel({
            id: fleet.props.id,
            plateNumbers: fleet.props.plateNumbers
        })
        await newModel.save();
        return fleet;
    }

}