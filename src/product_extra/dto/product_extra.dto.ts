import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductExtraDto {
    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    desc: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}