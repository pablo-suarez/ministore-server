import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { environmentMongoUri } from "./environment-mongo-uri";

@Module({
    imports:[
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const dbUser = configService.get<string>('mongo.mongoDBUser');
                const dbPassword = configService.get<string>('mongo.mongoDBPassword');
                const dbHost = configService.get<string>('mongo.mongoDBHost');
                const dbName = configService.get<string>('mongo.mongoDBName');
                const uri = environmentMongoUri(dbUser, dbPassword, dbHost);
                return {
                    uri,
                    dbName
                };
            },
            inject: [ConfigService],
        }),
    ]
})
export class MongoModule {}