import { Provider } from "@nestjs/common";
import { FileStoragePort } from '../../file-storage/domain/file-storage.port';
import { FilesystemStorageAdapter } from '../../file-storage/infrastructure/outbound/filesystem-storage.adapter';
import { S3StorageAdapter } from '../../file-storage/infrastructure/outbound/s3-storage.adapter';
import { ConfigService } from "@nestjs/config";

export const fileStoragePortPortSymbol = Symbol('UploadImagePort');

export const FileStorageProvider: Provider = {
    provide: fileStoragePortPortSymbol,
    useFactory: (configService: ConfigService): FileStoragePort => {
        const storageType = process.env.STORAGE_TYPE;
        if (storageType === 's3') return new S3StorageAdapter(configService);
        if (storageType === 'filesystem') return new FilesystemStorageAdapter();
        throw new Error(`Unsupported storage type: ${storageType}`);
    },
    inject:[ConfigService],
};