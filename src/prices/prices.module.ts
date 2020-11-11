import { Module } from '@nestjs/common';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';

@Module({
  imports: [
    CampaignsModule
  ],
  controllers: [PricesController],
  providers: [PricesService],
  exports: [PricesService]
})
export class PricesModule {}
