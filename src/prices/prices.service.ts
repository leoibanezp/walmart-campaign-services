import { Injectable } from '@nestjs/common';
import { ProductPriceDto } from '../dto/product-price.dto';

@Injectable()
export class PricesService {
  constructor() {}

  async applyPalindromeCampaignDiscount(products: ProductPriceDto[]) {
    products.forEach(product => {
      product.discount = product.price * 0.5;
      product.discountRate = 0.5;
    });
    return products;
  }
}
