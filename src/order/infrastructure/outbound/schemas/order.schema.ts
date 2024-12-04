import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { OrderItem } from '../../../domain/order.entity';

export type OrderDocument = Order & Document;

export class OrderItemSchema {
    @Prop({ required: true })
    productId: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    unitPrice: number;
}

@Schema()
export class Order {

    @Prop()
    _id: string;

    @Prop()
    id: string;

    @Prop({ type: [OrderItemSchema], required: true })
    productList: OrderItem[];

    @Prop()
    clientName: string;

    @Prop({ required: true })
    total: number;

    @Prop({ required: true })
    createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
