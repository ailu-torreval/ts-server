import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { OrderProductDto } from "src/order_product/dto/order_product.dto";

export class OrderDto {
    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsNumber()
    merchant_id: number;

    @IsNotEmpty()
    @IsNumber()
    contact_method: number;

    @IsNotEmpty()
    @IsNumber()
    ref_nr: number;

    @IsNotEmpty()
    @IsNumber()
    paymenth_method: number;

    @IsNotEmpty()
    @IsNumber()
    payment_ref: number;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    total_amount: number;

    @IsNotEmpty()
    order_products: OrderProductDto[];

}