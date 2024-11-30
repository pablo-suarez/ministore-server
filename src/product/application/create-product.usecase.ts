import { Inject, Injectable } from "@nestjs/common";
import { ProductsRepository, ProductsRepositorySymbol } from "../domain/products.repository";
import { ProductEntity, ProductPrimitives } from "../domain/product.entity";

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject(ProductsRepositorySymbol)
        private readonly repository: ProductsRepository
    ){ }
    async execute(props: ProductPrimitives) {
        const productEntity = ProductEntity.create(props);
        await this.repository.createProduct(productEntity);
        return productEntity;
    }
};