import { Injectable } from '@nestjs/common';

import { FileStoragePort } from '../domain/file-storage.port';
import { CombinedGetFilesPort } from '../domain/get-file.port';

@Injectable()
export class CombinedFileStorageAdapter implements CombinedGetFilesPort {
  constructor(
    private readonly s3StorageAdapter: FileStoragePort,
    private readonly filesystemStorageAdapter: FileStoragePort,
  ) {}

  async fetchFilePath(fileName: string): Promise<string> {
    try {
      // First try to get file from S3
      return await this.s3StorageAdapter.getFilePath(fileName);
    } catch (error) {
      // If it fails, try to get it from the filesystem
      return this.filesystemStorageAdapter.getFilePath(fileName);
    }
  }
}
