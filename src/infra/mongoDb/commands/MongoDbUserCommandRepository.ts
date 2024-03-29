import { UserCommandRepository } from "../../../domain/repositories/user/UserCommandRepository";
import { User } from "../../../domain/entities/User";
import { injectable } from "inversify";
import { userModel } from "../model/UserModel";

@injectable()
export class MongoDbUserCommandRepository implements UserCommandRepository {
  async save(user: User): Promise<User> {
    const newModel = new userModel({
      fleet: user.props.fleet,
      id: user.props.id,
      name: user.props.name,
    });
    await newModel.save();
    return user;
  }

  async update(user: User): Promise<User> {
    const result = await userModel.findOneAndUpdate(
      {
        id: user.props.id,
      },
      {
        $set: {
          fleet: user.props.fleet.map((fleet) => fleet),
        },
      },
      {
        upsert: true,
      }
    );
    return user;
  }
}
