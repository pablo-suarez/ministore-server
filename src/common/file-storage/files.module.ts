import { Module } from "@nestjs/common";
import { GetFileController } from './infrastructure/inbound/controllers/get-file.controller';
import { FilesystemStorageAdapter } from "./infrastructure/outbound/filesystem-storage.adapter";
import { S3StorageAdapter } from "./infrastructure/outbound/s3-storage.adapter";
import { CombinedFileStorageAdapter } from "./infrastructure/combined-file-storage.adapter";
import { GetFileUseCase } from "./application/find-file.usecase";
import { ConfigService } from "@nestjs/config";
import { getFileCombinedPortSymbol } from "../config/providers/combined-file-storage.provider";
import { FileSecureUrlAdapter } from './infrastructure/file-secure-url.adapter';

@Module({
    controllers: [GetFileController],
    providers: [
      FilesystemStorageAdapter,
      S3StorageAdapter,
      {
        provide: getFileCombinedPortSymbol,
        useFactory: (
          filesystemStorage: FilesystemStorageAdapter,
          s3Storage: S3StorageAdapter,
        ) => new CombinedFileStorageAdapter(filesystemStorage, s3Storage),
        inject: [FilesystemStorageAdapter, S3StorageAdapter],
      },
      GetFileUseCase,
    ],
    exports: [getFileCombinedPortSymbol],
  })
  export class FilesModule {}