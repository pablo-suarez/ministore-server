import { UserEntity } from "./user.entity";

export const UsersRepositorySymbol = Symbol.for('UsersRepository');

export interface UsersRepository {
    findByEmail(email: string): Promise<UserEntity | null>;
    createUser(user: UserEntity): Promise<void>;
}