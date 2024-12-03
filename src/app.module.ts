import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import mongoConfig from './common/config/mongo.config';
import { MongoModule } from './mongodb/mongodb.module';
import { ProductModule } from './product/product.module';
import { FilesModule } from './common/file-storage/files.module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [mongoConfig],
    isGlobal: true,
    envFilePath: process.env.PROJECT_ENV ? `.env.${process.env.PROJECT_ENV}` : '.env',
  }),
  MongoModule,
  ProductModule,
  FilesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
