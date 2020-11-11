import { MaxLength, IsOptional, IsPositive, IsNumber, Max, IsInt, IS_NUMBER_STRING, IsNumberString } from 'class-validator';

export class SearchProductFilterDto {
  @MaxLength(30, {
    message: 'The search criteria is too long',
  })
  @IsOptional()
  search: string;
  page: number;
  size: number;
}
