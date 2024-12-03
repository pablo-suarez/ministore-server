import { Inject, Injectable } from "@nestjs/common";
import { ProductsRepository, ProductsRepositorySymbol } from "../domain/products.repository";
import { ProductEntity, ProductPrimitives } from "../domain/product.entity";
import { FileStoragePort } from '../../common/file-storage/domain/file-storage.port';
import { fileStoragePortPortSymbol } from '../../common/config/providers/file-storage.provider';
import { FileSecureUrlAdapter } from '../../common/file-storage/infrastructure/file-secure-url.adapter';

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject(ProductsRepositorySymbol)
        private readonly repository: ProductsRepository,
        @Inject(fileStoragePortPortSymbol)
        private readonly fileStorage: FileStoragePort,
        private readonly fileSecureUrlAdapter: FileSecureUrlAdapter
     ){ }
    async execute(props: Omit<ProductPrimitives,'picture'>,picture:Express.Multer.File) {
        let securedUrl: string;
        const picturePath = await this.fileStorage.uploadFile(picture);

        const productEntity = ProductEntity.create({ ...props, picture: picturePath });

        await this.repository.createProduct(productEntity);

        if (productEntity.getProps().picture) {
            securedUrl = this.fileSecureUrlAdapter.generateUrl(productEntity.getProps().picture);
          }
    
        return {...productEntity.getProps(),picture:securedUrl};
    }
};