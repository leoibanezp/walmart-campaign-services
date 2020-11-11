import { IsInt, IsPositive, IsNumber, IsOptional, IsString } from 'class-validator';

export class CampaignDto {
  @IsString()
  name: string;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  discountRate: number;
}
