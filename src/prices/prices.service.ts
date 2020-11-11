import { Injectable } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';
import { CampaignContextDto } from '../dto/campaign-context.dto';
import { CampaignsService } from '../campaigns/campaigns.service';

@Injectable()
export class PricesService {
  constructor(private campaignsService: CampaignsService) {}

  async calculateFinalPriceProducts(products: ProductDto[], context: CampaignContextDto) {
    let productsWithCampaign = await this.campaignsService.getAvailableCampaignByProducts(products, context);

    productsWithCampaign.forEach(product => {
      product.discount = product.campaign == undefined ? 0: product.price * product.campaign.discountRate;
      product.discountRate = product.campaign == undefined ? 0: product.campaign.discountRate;
    });
    return productsWithCampaign;
  }
}
