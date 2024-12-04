import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { UsersRepository, UsersRepositorySymbol } from "../domain/users.repository";
import { UserEntity, UserPrimitives } from "../domain/user.entity";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(UsersRepositorySymbol)
        private readonly repository: UsersRepository,
     ){ }
    async execute(props: UserPrimitives) {
        const email = props.email;
        const emailExists = await this.repository.findByEmail(email);
        if(emailExists !== null) {
            throw new ConflictException(`Email ${email} already exists`);
        }
        const userEntity = UserEntity.create(props);
        await this.repository.createUser(userEntity);
        const data = userEntity.getProps();
        const { password, ...filteredData } = data;
        return filteredData;
    }
};