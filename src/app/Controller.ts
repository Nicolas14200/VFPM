import { Command } from "commander";
import { injectable } from "inversify";
import { CreateUser } from "../domain/useCases/user/CreateUser";
import { CreateFleet } from "../domain/useCases/fleet/CreateFleet";
import { AsignFleet } from "../domain/useCases/user/AsignFleet";
import { RegisterVehicles } from "../domain/useCases/vehicles/RegisterVehicles";
import { ParkVehicles } from "../domain/useCases/vehicles/ParkVehicules";
import { GetByPlateNumber } from "../domain/useCases/vehicles/GetByPlateNumber";

@injectable()
export class Controller {
  constructor(
    private readonly _createUser: CreateUser,
    private readonly _createFleet: CreateFleet,
    private readonly _asignFleet: AsignFleet,
    private readonly _RegisterVehicles: RegisterVehicles,
    private readonly _parkVehicles: ParkVehicles,
    private readonly _getByPlateNumber: GetByPlateNumber
  ) {}

  public async configure(): Promise<void> {
    const program = new Command();

    program
      .command("create-user <name>")
      .description("Create a user")
      .action(async (name) => {
        const user = await this._createUser.execute(name);
        console.log({
          userId: user.props.id,
        });
        process.exit();
      });

    program
      .command("create-fleet <userId>")
      .description("Create a new fleet for the specified user")
      .action(async (userId) => {
        const fleet = await this._createFleet.execute();
        await this._asignFleet.execute({
          userId,
          fleetId: fleet.props.id,
        });
        console.log({
          fleetId: fleet.props.id,
        });
        process.exit();
      });

    program
      .command("register-vehicle <fleetId> <vehiclePlateNumber>")
      .description("Register a vehicle to a fleet")
      .action(async (fleetId, vehiclePlateNumber) => {
        await this._RegisterVehicles.execute({
          fleetId: fleetId,
          vehiclePlateNumber: vehiclePlateNumber,
        });
        console.log(
          `Vehicle plate number : ${vehiclePlateNumber} save in fleet :${fleetId}`
        );
        process.exit();
      });

    program
      .command(
        "localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]"
      )
      .description("Localize a vehicle in a fleet")
      .action(async (fleetId, vehiclePlateNumber, lat, lng, alt) => {
        const vehicles = await this._getByPlateNumber.execute(
          vehiclePlateNumber
        );

        if (vehicles.props.fleetId.includes(fleetId)) {
          await this._parkVehicles.execute({
            vehiculeId: vehicles.props.id,
            position: {
              lat,
              lng,
              alt,
            },
          });
        }

        console.log(
          `Vehicle ${vehiclePlateNumber} localized to (${lat}, ${lng}, ${alt}) in fleet ${fleetId}`
        );

        process.exit();
      });

    program.parse(process.argv);
  }
}
