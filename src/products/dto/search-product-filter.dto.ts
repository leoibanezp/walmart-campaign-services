import { MaxLength, IsOptional, IsPositive, IsNumber, Max, IsInt, IS_NUMBER_STRING, IsNumberString } from 'class-validator';

export class SearchProductsFilterDto {
  @MaxLength(30, {
    message: 'The search criteria is too long',
  })
  @IsOptional()
  search: string;

  @IsNumber()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsOptional()
  @Max(50)
  size: number;
}
