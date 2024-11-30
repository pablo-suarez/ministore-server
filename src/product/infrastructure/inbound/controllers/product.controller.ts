import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from '../types/create-product.dto';
import { CreateProductUseCase } from '../../../application/create-product.usecase';
import { ProductResponseDTO } from '../../outbound/responses/product.response';

@Controller('product')
export class ProductController {

  constructor(private readonly createProductUseCase: CreateProductUseCase) { }

  @Post()
  async createProduct(@Body() createProduct: CreateProductDto): Promise<ProductResponseDTO> {
    const product = await this.createProductUseCase.execute(createProduct);
    const data = product.getProps();
    return { ...data };
  }
}
