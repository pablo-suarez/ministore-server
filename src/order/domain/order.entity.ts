import { BaseEntityProps, Entity, EntityID } from "src/common/domain/entity.base";
import { v4 as uuidv4 } from "uuid";

export type OrderItem = {
  productId: string;
  quantity: number;
  unitPrice?: number;
};

export type OrderPrimitives = {
  productList: OrderItem[];
  total: number;
  clientName: string;
} & Partial<BaseEntityProps>;

export class OrderEntity extends Entity<OrderPrimitives> {
  protected _id: EntityID;

  static create(data: OrderPrimitives): OrderEntity {
    const id = data.id ? data.id : uuidv4();
    const total = data.productList.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const order = OrderEntity.fromPrimitives({ ...data, id, total });
    return order;
  }

  static fromPrimitives(primitives: OrderPrimitives): OrderEntity {
    return new OrderEntity({
      id: primitives.id,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
      props: { ...primitives },
    });
  }
}
