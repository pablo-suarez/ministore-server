import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { OrdersRepositorySymbol, OrdersRepository } from '../domain/orders.repository';
import { OrderEntity, OrderPrimitives } from "../domain/order.entity";
import { ValidateProductsService } from "../domain/services/validate-products.service";
import { GetTotalService } from "../domain/services/get-total.service";


@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(OrdersRepositorySymbol)
    private readonly repository: OrdersRepository,
    private readonly validateProductsService: ValidateProductsService,
    private readonly getTotalService: GetTotalService
  ) { }
  async execute(props: Omit<OrderPrimitives, 'total'>) {
    const items = props.productList;
    let total: number;
    if (items && items.length > 0) {
      const orderItems = await this.validateProductsService.validateProductIds(props.productList);
      total = this.getTotalService.validateProductIds(orderItems);
      props.productList = orderItems;
    } else {
      throw new BadRequestException('List of products must not be empty');
    }


    const orderEntity = OrderEntity.create({
      ...props,
      total,
      clientName: props.clientName
    });

    await this.repository.createOrder(orderEntity);
    return orderEntity.getProps();
  }
};