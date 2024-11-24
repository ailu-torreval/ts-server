import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDto {
    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsNumber()
    merchant_id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    desc: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    offer_price: number;

    @IsNotEmpty()
    @IsBoolean()
    is_offer: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_options: boolean;

    @IsString()
    highlight_txt: string;

    @IsNotEmpty()
    @IsBoolean()
    is_suggestion: boolean;

    @IsString()
    option_title: string;

    @IsNumber()
    product_options_ids: number[];

    @IsNumber()
    product_extras_ids: number[];

}
