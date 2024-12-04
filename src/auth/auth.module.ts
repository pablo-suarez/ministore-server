import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/inbound/auth.controller';
import { UsersRepositorySymbol } from './domain/users.repository';
import { MongoUsersRepository } from './infrastructure/outbound/repositoreis/mongo-user.repository';
import { CreateUserUseCase } from './application/create-user.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/outbound/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginUseCase } from './application/login.usecase';
import { JwtPortSymbol } from './domain/jwt.port';
import { JwtAdapter } from './infrastructure/adapters/jwt.adapter';
import { JwtAuthGuard } from './infrastructure/guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [{
    provide: UsersRepositorySymbol,
    useClass: MongoUsersRepository
  },
  {
    provide: JwtPortSymbol,
    useClass: JwtAdapter
  },
  CreateUserUseCase,
  LoginUseCase,
  JwtAuthGuard,
  ],
  exports:[JwtPortSymbol]
})
export class AuthModule { }
