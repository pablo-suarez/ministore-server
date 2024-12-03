import { v4 as uuid } from 'uuid';
import { extname } from 'path';

export class FileNaming {
  generateFileName(fileName: string): string {
    const fileExtension = extname(fileName);
    return `${uuid()}${fileExtension}`;
  }
}