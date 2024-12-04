import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/create-order.usecase';
import { CreateOrderDto } from './types/create-order.dto';
import { UpdateOrderDto } from './types/update-order.dto';
import { UpdateOrderUseCase } from '../../application/update-order.usecase';
import { OrderResponseDTO } from '../outbound/responses/order.response';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
  ) { }

  @Post()
  async createOrder(@Body() body: CreateOrderDto): Promise<OrderResponseDTO> {
    return await this.createOrderUseCase.execute(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<OrderResponseDTO> {
    return await this.updateOrderUseCase.execute({ ...updateOrderDto, id });
  }

}