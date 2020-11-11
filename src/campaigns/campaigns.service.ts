import { Injectable } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';
import { CampaignContextDto } from '../dto/campaign-context.dto';
import { CampaignDto } from '../dto/campaign.dto';

@Injectable()
export class CampaignsService {
  constructor() {}

  readonly halfPrice = 0.5;

  async getAvailableCampaignByProducts(products: ProductDto[], context: CampaignContextDto ): Promise<ProductDto[]> {
    if (context.isPalindrome) {
        const campaign = new CampaignDto();
        campaign.name = 'palindrome campaign';
        campaign.discountRate = this.halfPrice;

        products.forEach(product => {
          product.campaign = campaign;
        });
        return products;
    }
    return products;
  }
}
