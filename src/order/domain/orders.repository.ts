import { EntityID } from './../../common/domain/entity.base';
import { OrderEntity, OrderPrimitives } from './order.entity';

export type UpdateOrderCommand = Partial<OrderPrimitives> & { id: EntityID };

export const OrdersRepositorySymbol = Symbol.for('OrdersRepository');

export interface OrdersRepository {
    createOrder(input: OrderEntity): Promise<void>;
    updateOrder(input: UpdateOrderCommand): Promise<OrderEntity>;
}
