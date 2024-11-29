import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductOption } from "src/product_option/entities/product_option.entity";
import { ProductExtra } from "src/product_extra/entities/product_extra.entity";
import { ProductOptionDto } from "src/product_option/dto/product_option.dto";
import { ProductExtraDto } from "src/product_extra/dto/product_extra.dto";

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

    option: ProductOptionDto;

    extras: ProductExtraDto[];
}
