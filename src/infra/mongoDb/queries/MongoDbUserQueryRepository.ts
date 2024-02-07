import "reflect-metadata";
import { UserQueryRepository } from "../../../domain/repositories/user/UserQueryRepository";
import { injectable } from "inversify";
import { User } from "../../../domain/entities/User";
import { userModel } from "../model/UserModel";
import {
  MongoDbUserMappper,
  MongoDbUserMappperProps,
} from "../mappers/MongoDbUserMapper";

@injectable()
export class MongoDbUserQueryRepository implements UserQueryRepository {
  private mongoDbUserMappper: MongoDbUserMappper = new MongoDbUserMappper();

  async getById(id: string): Promise<User> {
    const result: MongoDbUserMappperProps = await userModel.findOne({
      id: id,
    });

    if (!result) {
      return null;
    }
    return this.mongoDbUserMappper.toDomain(result);
  }
}
