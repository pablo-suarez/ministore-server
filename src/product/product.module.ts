import { Module } from '@nestjs/common';
import { ProductController } from './infrastructure/inbound/controllers/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './infrastructure/outbound/schemas/product.schema';
import { ProductsRepositorySymbol } from './domain/products.repository';
import { MongoProductsRepository } from './infrastructure/outbound/repositories/mongo-products.repository';
import { CreateProductUseCase } from './application/create-product.usecase';
import { FileStorageProvider } from '../common/config/providers/file-storage.provider';
import { FileNaming } from '../common/file-storage/infrastructure/file-naming';
import { FileSecureUrlAdapter } from '../common/file-storage/infrastructure/file-secure-url.adapter';
import { FindProductByIdUseCase } from './application/find-by-id-product.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  providers: [{
    provide: ProductsRepositorySymbol,
    useClass: MongoProductsRepository
  },
    FileStorageProvider,
    FileNaming,
    FileSecureUrlAdapter,
    CreateProductUseCase,
    FindProductByIdUseCase
  ],
  controllers: [ProductController],
  exports: [ProductsRepositorySymbol]
})
export class ProductModule { }
