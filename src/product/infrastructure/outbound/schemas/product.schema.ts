import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @Prop()
    _id: string;

    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    sku: string;

    @Prop()
    picture: string;

    @Prop()
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);