import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "../entities/role";

export class UserDto {
    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    notification_token: string;
    
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    role: Role;

    @IsNotEmpty()
    @IsString()
    phone_nr: string;
}
