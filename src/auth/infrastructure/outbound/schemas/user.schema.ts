import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop()
    _id: string;

    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
