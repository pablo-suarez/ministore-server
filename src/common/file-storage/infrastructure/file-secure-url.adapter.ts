import { Injectable } from '@nestjs/common';
import { fileSecureUrl } from '../helpers/fileSecureUrl';


@Injectable()
export class FileSecureUrlAdapter {
  generateUrl(fileId: string): string {
    return fileSecureUrl(fileId);
  }
}