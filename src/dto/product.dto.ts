import { IsInt, IsPositive, IsNumber, IsOptional } from 'class-validator';
import { CampaignDto } from './campaign.dto';

export class ProductDto {
  id: number;

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

  @IsOptional()
  campaign: CampaignDto;
}
