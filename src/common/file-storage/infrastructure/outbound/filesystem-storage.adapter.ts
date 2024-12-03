import { Injectable } from "@nestjs/common";
import { FileStoragePort } from "../../domain/file-storage.port";
import { join } from "path";
import { existsSync, writeFile } from "fs";
import { promisify } from "util";

const writeFileAsync = promisify(writeFile);

@Injectable()
export class FilesystemStorageAdapter implements FileStoragePort {

    private basePath = join(__dirname, '../../../../static/files-uploaded');

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const filePath = join(this.basePath, file.filename);
        await writeFileAsync(filePath, file.buffer);
        return file.filename;
    }
    
    async getFilePath(fileName: string): Promise<string> {
        const filePath = join(this.basePath, fileName);
        if (!existsSync(filePath)) {
          throw new Error(`File ${fileName} does not exist in filesystem.`);
        }
        return filePath;
    }
}
