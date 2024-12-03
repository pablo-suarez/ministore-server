import { ProductEntity } from "./product.entity";

export const ProductsRepositorySymbol = Symbol.for('ProductsRepository');

export interface ProductsRepository {
    createProduct(input: ProductEntity): Promise<void>;
    findProductById(id: string): Promise<ProductEntity>;
}