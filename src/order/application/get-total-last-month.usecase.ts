import { Inject, Injectable } from "@nestjs/common";
import { OrdersRepository, OrdersRepositorySymbol } from "../domain/orders.repository";

@Injectable()
export class GetTotalSoldLastMonthUseCase {
  constructor(
    @Inject(OrdersRepositorySymbol)
    private readonly repository: OrdersRepository,
  ) {}

  async execute(): Promise<number> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const now = new Date();
    const orders = await this.repository.findOrdersByDateRange(oneMonthAgo, now);

    return orders.reduce((total, order) => total + order.getProps().total, 0);
  }
}