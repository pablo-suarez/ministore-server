import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntityProps, Entity, EntityID } from '../../common/domain/entity.base';

export type UserPrimitives = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
} & Partial<BaseEntityProps>;

export class UserEntity extends Entity<UserPrimitives> {
    protected _id: EntityID;

    static create(data: UserPrimitives): UserEntity {
        const id = data.id ? data.id : uuidv4();
        const password = bcrypt.hashSync( data.password, 10 ) 
        const user = UserEntity.fromPrimitives({ ...data, password, id });
        return user;
    }

    static fromPrimitives(primitives: UserPrimitives): UserEntity {
        return new UserEntity({
            id: primitives.id,
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt,
            props: {
                ...primitives
            }
        });
    }
}
