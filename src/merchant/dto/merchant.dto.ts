import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class MerchantDto {
    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsNumber()
    admin_id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    desc: string;

    @IsNotEmpty()
    @IsBoolean()
    is_table_service: boolean;

}
