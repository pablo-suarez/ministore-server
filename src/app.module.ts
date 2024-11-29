import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import mongoConfig from './common/config/mongo.config';
import { MongoModule } from './mongodb/mongodb.module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [mongoConfig],
    isGlobal: true,
    envFilePath: process.env.PROJECT_ENV ? `.env.${process.env.PROJECT_ENV}` : '.env',
  }),
  MongoModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
