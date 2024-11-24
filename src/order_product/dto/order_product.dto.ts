import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductExtra } from "src/product_extra/entities/product_extra.entity";
import { ProductOption } from "src/product_option/entities/product_option.entity";


export class OrderProductDto {
    @IsNumber()
    id: number;
  
    @IsNotEmpty()
    @IsNumber()
    order_id: number;
  
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsNumber()
    price: number;
    
    @IsNotEmpty()
    @IsNumber()
    total_amount: number;

    order_product_extras: ProductExtra[];

    order_product_options: ProductOption[];
}