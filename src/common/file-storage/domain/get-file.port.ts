export interface CombinedGetFilesPort {
    fetchFilePath(fileName: string): Promise<string>;
  }