import { Controller, Get, Param, Res } from "@nestjs/common";
import { GetFileUseCase } from '../../../application/find-file.usecase';
import { Response } from 'express';

@Controller('files')
export class GetFileController {
    constructor(private readonly getProductImageUseCase: GetFileUseCase) { }

    @Get('/:fileName')
    async findProductImage(@Res() res: Response, @Param('fileName') fileName: string) {
        const filePath = await this.getProductImageUseCase.execute(fileName);
        try {
            //Check where file is saved
            if (filePath.startsWith('http')) {
                //For S3 route
                return res.redirect(filePath);
            } else {
                //For local route
                return res.sendFile(filePath)
            }
        } catch (error) {
            return { error }
        }
    }
}