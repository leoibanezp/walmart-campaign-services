import { IsOptional } from 'class-validator';

export class CampaignContextDto {
  @IsOptional()
  search: string;

  @IsOptional()
  link: string;

  @IsOptional()
  hasMobilApp: boolean;

  @IsOptional()
  thisBirhday: boolean;

  @IsOptional()
  isPalindrome: boolean;
}
