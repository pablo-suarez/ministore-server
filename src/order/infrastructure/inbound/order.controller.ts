import { GetHighestOrderUseCase } from './../../application/get-highest-order.usecase';
import { GetTotalSoldLastMonthUseCase } from './../../application/get-total-last-month.usecase';
import { JwtAuthGuard } from './../../../auth/infrastructure/guards/auth.guard';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/create-order.usecase';
import { CreateOrderDto } from './types/create-order.dto';
import { UpdateOrderDto } from './types/update-order.dto';
import { UpdateOrderUseCase } from '../../application/update-order.usecase';
import { OrderResponseDTO } from '../outbound/responses/order.response';
import { GetTotalLastMonthResponse } from '../outbound/responses/get-total-last-month.response';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly getTotalSoldLastMonthUseCase: GetTotalSoldLastMonthUseCase,
    private readonly getHighestOrderUseCase: GetHighestOrderUseCase,
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() body: CreateOrderDto): Promise<OrderResponseDTO> {
    return await this.createOrderUseCase.execute(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<OrderResponseDTO> {
    return await this.updateOrderUseCase.execute({ ...updateOrderDto, id });
  }

  @Get('total-sold-last-month')
  @UseGuards(JwtAuthGuard)
  async getTotalSoldLastMonth():Promise<GetTotalLastMonthResponse> {
    const totalSold = await this.getTotalSoldLastMonthUseCase.execute();
    return { totalSold };
  }

  @Get('higher-amount-order')
  @UseGuards(JwtAuthGuard)
  async getHigherAmountOrder():Promise<OrderResponseDTO> {
    return await this.getHighestOrderUseCase.execute();
  }

}