import { Model, PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { TProductDocument } from './schemas/product.schema';
import { SearchProductFilterDto } from '../dto/search-product-filter.dto';
import { IPaginateResult, getFormatSearchWithPaging } from '../common/paginate';
import { ConfigService } from '../config/config.service';
import { ProductDto } from '../dto/product.dto';
import { CampaignContextDto } from '../dto/campaign-context.dto';
import { PricesService } from '../prices/prices.service';
import { IsPalindrome } from '../common/palindrome';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(
      private productModel: ProductsRepository,
      private configService: ConfigService,
      private priceService: PricesService
    ) {}

    async searchProductsWithFilters(filterDto: SearchProductFilterDto): Promise<IPaginateResult<TProductDocument>> {
      const { search, page, size } = getFormatSearchWithPaging(filterDto, this.configService);
      if (Number(search)) {
        return this.getProductById(Number(search));
      }
      if (search) {
        return this.getAllProductsByFilter(search, page, size);
      }
      return this.getAllProducts(page, size);
    }

    async getAllProductsByFilter(search: string, page: number, size: number): Promise<IPaginateResult<TProductDocument>> {
      let campaignContext = new CampaignContextDto();
      campaignContext.search = search;
      campaignContext.isPalindrome = search.length > 3 ? IsPalindrome(search) : false;
      let products = await this.productModel.findByFilter(search, page, size);

      return this.calculateFinalPriceProducts(products, campaignContext);
    }
    async getAllProducts(page: number, size: number): Promise<IPaginateResult<TProductDocument>> {
      let products = await this.productModel.findAll(page, size);
      let campaignContext = new CampaignContextDto();
      return this.calculateFinalPriceProducts(products, campaignContext);
    }
    async getProductById(id: number): Promise<IPaginateResult<TProductDocument>> {
      let campaignContext = new CampaignContextDto();
      campaignContext.search = id.toString();
      campaignContext.isPalindrome = IsPalindrome(id.toString());
      let products = await this.productModel.findById(id);
      return this.calculateFinalPriceProducts(products, campaignContext);
    }
    private async getProductPriceDtoFormat(products: IPaginateResult<TProductDocument>): Promise<ProductDto[]> {
      if (!products) {
        return;
      }
      if (!products.data) {
        return;
      }
      return products.data.map(function(item) {
        let product: ProductDto = new ProductDto();
        product.id = item.id;
        product.price = item.price;
        return product;
      });
    }
    private async calculateFinalPriceProducts(products: IPaginateResult<TProductDocument>, context: CampaignContextDto) {
      if (!products) {
        return;
      }
      if (!products.data) {
        return;
      }
      let productsDto = await this.getProductPriceDtoFormat(products);
      const productsWithDiscount = await this.priceService.calculateFinalPriceProducts(productsDto,context);

      products.data.forEach(product => {
        let discount = productsWithDiscount.find(x => x.id === product.id);
        if (discount) {
          product.discount = discount.discount == undefined ? 0 : discount.discount;
          product.discountRate = discount.discountRate == undefined ? 0 : discount.discountRate;
        }
      });
      return products;
    }
}
