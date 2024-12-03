import { Provider } from "@nestjs/common";
import { CombinedGetFilesPort } from '../../file-storage/domain/get-file.port';
import { ConfigService } from "@nestjs/config";
import { FilesystemStorageAdapter } from '../../file-storage/infrastructure/outbound/filesystem-storage.adapter';
import { S3StorageAdapter } from '../../file-storage/infrastructure/outbound/s3-storage.adapter';
import { CombinedFileStorageAdapter } from '../../file-storage/infrastructure/combined-file-storage.adapter';


export const getFileCombinedPortSymbol = Symbol('GetFilePort');

export const CombinedFileStorageProvider: Provider = {
  provide: getFileCombinedPortSymbol,
  useFactory: (configService: ConfigService): CombinedGetFilesPort => {
    const s3Adapter = new S3StorageAdapter(configService);
    const filesystemAdapter = new FilesystemStorageAdapter();
    return new CombinedFileStorageAdapter(s3Adapter, filesystemAdapter);
  },
  inject: [ConfigService],
};
