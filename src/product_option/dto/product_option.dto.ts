import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductOptionDto {
    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    desc: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
