import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserEntity } from '../../../domain/user.entity';
import { User as UserModelMongo } from "../schemas/user.schema";
import { MongoRepository } from '../../../../core/infrastructure/persistence/mongo/mongo.repository';
import { UsersRepository } from '../../../domain/users.repository';

@Injectable()
export class MongoUsersRepository extends MongoRepository<UserModelMongo, UserEntity> implements UsersRepository {

    constructor(
        @InjectModel(UserModelMongo.name)
        userModel: Model<UserModelMongo>,
    ) {
        super(userModel);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.findOne({email});
    }

    async createUser(entity: UserEntity): Promise<void> {
        const props = entity.getProps();
        await this.persists({
            ...props,
            id: entity.id,
        });
    }

    mapToPrimitives(data: UserModelMongo): UserEntity {
        return UserEntity.fromPrimitives({
            id: data._id,
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        });
    }

}