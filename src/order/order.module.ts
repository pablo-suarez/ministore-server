import { GetHighestOrderUseCase } from './application/get-highest-order.usecase';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { OrderController } from './infrastructure/inbound/order.controller';
import { CreateOrderUseCase } from './application/create-order.usecase';
import { OrdersRepositorySymbol } from './domain/orders.repository';
import { MongoOrdersRepository } from './infrastructure/outbound/repositories/mongo-orders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './infrastructure/outbound/schemas/order.schema';
import { ProductModule } from '../product/product.module';
import { ValidateProductsService } from './domain/services/validate-products.service';
import { UpdateOrderUseCase } from './application/update-order.usecase';
import { GetTotalService } from './domain/services/get-total.service';
import { GetTotalSoldLastMonthUseCase } from './application/get-total-last-month.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), 
    ProductModule,
    AuthModule
  ],
  providers: [{
    provide: OrdersRepositorySymbol,
    useClass: MongoOrdersRepository
  },
    CreateOrderUseCase,
    UpdateOrderUseCase,
    ValidateProductsService,
    GetTotalService,
    GetTotalSoldLastMonthUseCase,
    GetHighestOrderUseCase
  ],
  controllers: [OrderController]
})
export class OrderModule { }
