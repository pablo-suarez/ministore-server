import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from '../types/create-product.dto';
import { CreateProductUseCase } from '../../../application/create-product.usecase';
import { ProductResponseDTO } from '../../outbound/responses/product.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { pictureFilter } from '../../../../common/file-storage/helpers/pictureFilter.helper';
import { FileNaming } from '../../../../common/file-storage/infrastructure/file-naming';

@Controller('product')
export class ProductController {

  constructor(private readonly createProductUseCase: CreateProductUseCase, private readonly fileNaming: FileNaming,) { }

  @Post()
  @UseInterceptors(FileInterceptor('picture', { fileFilter: pictureFilter }))
  async createProduct(@Body() createProduct: CreateProductDto, @UploadedFile() picture: Express.Multer.File): Promise<ProductResponseDTO> {

    if (!picture) throw new BadRequestException('Please check if file is a valid image');
    const renamedFile = { ...picture, filename: this.fileNaming.generateFileName(picture.originalname) };
    const product = await this.createProductUseCase.execute(createProduct, renamedFile);

    const data = product;
    return { ...data };
  }

}
