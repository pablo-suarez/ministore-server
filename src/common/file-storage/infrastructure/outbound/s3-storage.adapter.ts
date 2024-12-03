import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FileStoragePort } from "../../domain/file-storage.port";
import { GetObjectCommand, GetObjectCommandInput, HeadObjectCommand, HeadObjectCommandInput, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, S3Client } from "@aws-sdk/client-s3";
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class S3StorageAdapter implements FileStoragePort {
    private region: string;
    private s3: S3Client;
    private result: string;
    private bucket: string;
    constructor(private configService: ConfigService) {
        this.region = this.configService.get<string>('AWS_S3_REGION');
        this.s3 = new S3Client({
            region: this.region,
        });
        this.bucket = this.configService.get<string>('AWS_S3_BUCKET');
    }
    async uploadFile(file: Express.Multer.File): Promise<string> {
        const params: PutObjectCommandInput = {
            Bucket: this.bucket,
            Key: file.filename,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };
        try {
            const response: PutObjectCommandOutput = await this.s3.send(new PutObjectCommand(params));
            if (response.$metadata.httpStatusCode == 200) {

                this.result = file.filename;
            }
        } catch (err) {
            throw new BadRequestException(err);
        }
        return this.result;
    }

    async getFilePath(fileName: string): Promise<string> {
        const headParams = {
            Bucket: this.bucket,
            Key: fileName,
        };

        try {
            await this.s3.send(new HeadObjectCommand(headParams));
            const params: GetObjectCommandInput = {
                Bucket: this.bucket,
                Key: fileName,
            };
            const url = await getSignedUrl(this.s3, new GetObjectCommand(params), { expiresIn: 60 });
            return url;
        } catch (error) {
            if (error.name === 'NoSuchKey' || error.name === 'NotFound') {
                throw new NotFoundException(`File ${fileName} does not exist.`);
            }
            console.error('Error fetching file from S3:', error);
            throw new Error('Failed to fetch file from S3');
        }
    }


}