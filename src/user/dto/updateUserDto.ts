import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "../entities/role";

export class UpdateUserDto {
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
    email: string;

    @IsString()
    role: Role;

    @IsNotEmpty()
    @IsDate()
    dob: Date;

    @IsNotEmpty()
    @IsString()
    phone_nr: string;
}