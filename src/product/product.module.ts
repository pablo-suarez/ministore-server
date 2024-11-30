import { Module } from '@nestjs/common';
import { ProductController } from './infrastructure/inbound/controllers/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './infrastructure/outbound/schemas/product.schema';
import { ProductsRepositorySymbol } from './domain/products.repository';
import { MongoProductsRepository } from './infrastructure/outbound/repositories/mongo-products.repository';
import { CreateProductUseCase } from './application/create-product.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema}])
  ],
  providers:[{
    provide: ProductsRepositorySymbol,
    useClass: MongoProductsRepository
  },
  CreateProductUseCase],
  controllers: [ProductController]
})
export class ProductModule {}
