import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { OrdersRepositorySymbol, OrdersRepository, UpdateOrderCommand } from '../domain/orders.repository';
import { ValidateProductsService } from "../domain/services/validate-products.service";
import { GetTotalService } from "../domain/services/get-total.service";

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    @Inject(OrdersRepositorySymbol)
    private readonly repository: OrdersRepository,
    private readonly validateProductsService: ValidateProductsService,
    private readonly getTotalService: GetTotalService
  ) { }
  async execute(props: UpdateOrderCommand) {
    const items = props.productList;
    if (items && items.length > 0) {
      const orderItems = await this.validateProductsService.validateProductIds(props.productList);
      const total = this.getTotalService.validateProductIds(orderItems);
      props.productList = orderItems;
      props.total = total;
    }
    const result = await this.repository.updateOrder(props);
    const res = result.getProps();
    return {...res};
  }
};
