import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly sku: string;

    @IsString()
    readonly picture: string;

    @IsNumber()
    readonly price: number;
}