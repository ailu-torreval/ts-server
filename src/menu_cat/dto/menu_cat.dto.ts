import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MenuCatDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  merchant_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  desc: string;

  @IsNumber()
  order: number;

  @IsString()
  icon: string;
}
