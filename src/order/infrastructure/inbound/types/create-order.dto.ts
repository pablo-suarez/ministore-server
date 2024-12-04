import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @IsString()
    readonly clientName: string;

    @IsArray()
    @Type(() => CreateProductListDto)
    readonly productList: CreateProductListDto[];
}

export class CreateProductListDto {
    @IsString()
    productId: string;

    @IsNumber()
    quantity: number;
}