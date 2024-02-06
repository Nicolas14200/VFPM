import 'reflect-metadata';
import mongoose from "mongoose";
import { MongoDbUserCommandRepository } from "../mongoDb/commands/MongoDbUserCommandRepository";
import { User } from "../../domain/entities/User";
import { MongoDbUserQueryRepository } from "../mongoDb/queries/MongoDbUserQueryRepository";

describe('Integration - MongoDbUserCommandRepository', () => {
    let userCommandRepo: MongoDbUserCommandRepository;
    let userQueryRepo: MongoDbUserQueryRepository;
    let user: User;
    
    beforeAll(async ()=> {
        await mongoose.connect('mongodb://127.0.0.1:27017/VFPM');
        userCommandRepo = new MongoDbUserCommandRepository();
        userQueryRepo = new MongoDbUserQueryRepository();
        user = User.create("Nicolas");
    })

    it("Should save a user", async () => {
        await userCommandRepo.save(user);
        const result = await userQueryRepo.getById(user.props.id);
        expect(result.props.name).toEqual("Nicolas");
    })

    it("Should return null if user doesn't exist", async () => {
        const result = await userQueryRepo.getById("");
        expect(result).toBeFalsy();
    })

    it("Should update user", async () => {
        user.addNewFleet('aaaa');
        await userCommandRepo.update(user);
        const result = await userQueryRepo.getById(user.props.id);
        console.log("result", result);
        expect(result.props.fleet[0]).toEqual('aaaa');
    })
})