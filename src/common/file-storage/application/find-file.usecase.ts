import { Injectable, Inject } from '@nestjs/common';
import { getFileCombinedPortSymbol } from '../../config/providers/combined-file-storage.provider';
import { CombinedGetFilesPort } from '../domain/get-file.port';


@Injectable()
export class GetFileUseCase {
  constructor(
    @Inject(getFileCombinedPortSymbol)
    private readonly fileStorage: CombinedGetFilesPort) {}

  async execute(imageName: string): Promise<string> {
    return this.fileStorage.fetchFilePath(imageName);
  }
}