import { BaseEntityProps, Entity, EntityID } from "src/common/domain/entity.base";
import { v4 as uuidv4 } from 'uuid';

export type ProductPrimitives = {
    name: string;
    sku: string;
    picture: string;
    price: number;
} & Partial<BaseEntityProps>;

export class ProductEntity extends Entity<ProductPrimitives> {
    protected _id: EntityID;

    static create(data: ProductPrimitives): ProductEntity {
        const id = data.id ? data.id : uuidv4();
        const product = ProductEntity.fromPrimitives({ ...data, id });
        return product;
    }

    static fromPrimitives(primitives: ProductPrimitives): ProductEntity {
        return new ProductEntity({
            id: primitives.id,
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt,
            props: {
                ...primitives
            }
        });
    }
}