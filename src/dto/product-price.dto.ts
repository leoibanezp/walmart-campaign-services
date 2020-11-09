import { IsInt, IsPositive, IsNumber, IsOptional } from 'class-validator';

export class ProductPriceDto {
  id: string;

  @IsPositive()
  @IsNumber()
  price: number;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  discount: number;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  discountRate: number;
}
