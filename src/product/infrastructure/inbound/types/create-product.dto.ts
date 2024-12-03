import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly sku: string;

    @IsNumber()
    @Type(() => Number)
    readonly price: number;

}