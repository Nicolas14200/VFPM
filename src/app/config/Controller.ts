import { Command } from 'commander';
import { injectable } from 'inversify';
import { CreateUser } from '../../domain/useCases/user/CreateUser';

@injectable()
export class Controller {
    constructor(
        private readonly _createUser: CreateUser,
    ) {}

    public async configure(): Promise<void> {
        const program = new Command();
        
        program
            .command('create <name>')
            .description('Create a fleet for the specified user')
            .action((name) => {
                console.log(`User created for user ${name}`);
                this._createUser.execute(name);

            });

        program
            .command('register-vehicle <fleetId> <vehiclePlateNumber>')
            .description('Register a vehicle to a fleet')
            .action((fleetId, vehiclePlateNumber) => {
                console.log(`Vehicle ${vehiclePlateNumber} registered to fleet ${fleetId}`);
                // You can add logic here to register the vehicle to the fleet
            });

        program
            .command('localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]')
            .description('Localize a vehicle in a fleet')
            .action((fleetId, vehiclePlateNumber, lat, lng, alt) => {
                if (alt) {
                    console.log(`Vehicle ${vehiclePlateNumber} localized to (${lat}, ${lng}, ${alt}) in fleet ${fleetId}`);
                } else {
                    console.log(`Vehicle ${vehiclePlateNumber} localized to (${lat}, ${lng}) in fleet ${fleetId}`);
                }
                // You can add logic here to localize the vehicle in the fleet
            });

        program.parse(process.argv);
    }
}