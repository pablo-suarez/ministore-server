export interface FileStoragePort {
    uploadFile(file: Express.Multer.File): Promise<string>;
    getFilePath(fileName: string): Promise<string>;
  }
  