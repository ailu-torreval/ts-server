import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class MerchantTableDto {

    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    merchant_id: number;

    @IsNotEmpty()
    @IsNumber()
    capacity: number;

    @IsNotEmpty()
    @IsString()
    table_code: string;
}
