import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TableDto {
    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsNumber()
    merchant_id: number;

    @IsNotEmpty()
    @IsString()
    table_code: string;

    @IsNotEmpty()
    @IsNumber()
    capacity: number;
}
