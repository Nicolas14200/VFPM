import { User } from "../../entities/User";
import { Vehicles } from "../../entities/Vehicles";


export const user =  User.create("Nico");
export const vehicle01 =  Vehicles.create(user.props.id);