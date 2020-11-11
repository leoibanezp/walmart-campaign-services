import { IsInt, IsPositive, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsInt()
  id: number;

  description: string;

  brand: string;

  image: string;

  @IsPositive()
  @IsNumber()
  price: number;
}
