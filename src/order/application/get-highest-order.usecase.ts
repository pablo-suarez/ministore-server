import { Inject, Injectable } from "@nestjs/common";
import { OrdersRepository, OrdersRepositorySymbol } from "../domain/orders.repository";
import { OrderResponseDTO } from "../infrastructure/outbound/responses/order.response";

@Injectable()
export class GetHighestOrderUseCase {
  constructor(
    @Inject(OrdersRepositorySymbol)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute(): Promise<OrderResponseDTO> {
    const highestOrder = await this.ordersRepository.findHighestAmountOrder();

    if (!highestOrder) {
      throw new Error('No orders found.');
    }
    const result = highestOrder.getProps();

    return result;
  }
}