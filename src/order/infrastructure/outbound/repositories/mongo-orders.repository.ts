import { Injectable } from "@nestjs/common";
import { OrdersRepository, UpdateOrderCommand } from '../../../domain/orders.repository';
import { OrderEntity } from '../../../domain/order.entity';
import { Order as OrderModelMongo } from "../schemas/order.schema";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { MongoRepository } from '../../../../core/infrastructure/persistence/mongo/mongo.repository';

@Injectable()
export class MongoOrdersRepository
  extends MongoRepository<OrderModelMongo, OrderEntity>
  implements OrdersRepository {
  constructor(
    @InjectModel(OrderModelMongo.name)
    orderModel: Model<OrderModelMongo>,
  ) {
    super(orderModel);
  }

  async createOrder(entity: OrderEntity): Promise<void> {
    const props = entity.getProps();
    await this.persists({ ...props, id: entity.id });
  }

  async updateOrder(input: UpdateOrderCommand): Promise<OrderEntity> {
    return this.findByIdAndUpdate(input.id, input, { new: true });
  }

  async findOrdersByDateRange(startDate: Date, endDate: Date): Promise<OrderEntity[]> {
    const results = await this.model.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });
    return results.map(this.mapToPrimitives);
  }
  
  async findHighestAmountOrder(): Promise<OrderEntity | null> {
    const highestOrder = await this.model
    .findOne()
      .sort({ total: -1 })
      .exec();

    if (!highestOrder) {
      return null;
    }
    return this.mapToPrimitives(highestOrder);
  }

  mapToPrimitives(data: OrderModelMongo): OrderEntity {
    return OrderEntity.fromPrimitives({
      id: data._id,
      productList: data.productList,
      total: data.total,
      createdAt: data.createdAt,
      clientName: data.clientName,
    });
  }
}