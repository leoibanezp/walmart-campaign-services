import { Test } from '@nestjs/testing';
import { CampaignsService } from './campaigns.service';
import { ProductDto } from '../dto/product.dto';
import { CampaignContextDto } from '../dto/campaign-context.dto';

describe('CampaignsService', () => {
  let campaignsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CampaignsService
      ],
    }).compile();

    campaignsService = await module.get<CampaignsService>(CampaignsService);
  });
  describe('getAvailableCampaignByProducts', () => {
    it('Obtener campaña palindromo', async () => {
      const product: ProductDto = { id: 100, price: 55000, discount: 0, campaign: undefined, discountRate: 0 };
      let products: ProductDto[] = [
        product
      ];
      const context: CampaignContextDto = {
        search: '101',
        link: undefined,
        hasMobilApp: undefined,
        thisBirhday: undefined,
        isPalindrome: true
      };
      const result = await campaignsService.getAvailableCampaignByProducts(products, context);
      expect(true);
    });
  });


});
