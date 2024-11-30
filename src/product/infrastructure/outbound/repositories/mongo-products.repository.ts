import { Injectable } from "@nestjs/common";
import { MongoRepository } from "src/core/infrastructure/persistence/mongo/mongo.repository";
import { Product as ProductModelMongo } from "../schemas/product.schema";
import { ProductEntity } from "src/product/domain/product.entity";
import { ProductsRepository } from "src/product/domain/products.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class MongoProductsRepository extends MongoRepository<ProductModelMongo, ProductEntity> implements ProductsRepository {

    constructor(
        @InjectModel(ProductModelMongo.name)
        productModel: Model<ProductModelMongo>,
    ) {
        super(productModel);
    }
    async createProduct(entity: ProductEntity): Promise<void> {
        const props = entity.getProps();
        await this.persists({
            ...props,
            id: entity.id,
        });
    }

    mapToPrimitives(data: ProductModelMongo): ProductEntity {
        return ProductEntity.fromPrimitives({
            id: data._id,
            name: data.name,
            sku: data.sku,
            picture: data.picture,
            price: data.price,
        });
    }

}