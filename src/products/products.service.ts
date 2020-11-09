import { Model, PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductSchema, TProductDocument } from './schemas/product.schema';
import { SearchProductsFilterDto } from './dto/search-product-filter.dto';
import { IPaginateResult, getFormatSearchWithPaging } from '../common/paginate';
import { ConfigService } from '../config/config.service';
import { PricesService } from 'src/prices/prices.service';
import { ProductPriceDto } from '../dto/product-price.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: PaginateModel<TProductDocument>, private configService: ConfigService, private priceService: PricesService) {}

    async searchProductsWithFilters(filterDto: SearchProductsFilterDto): Promise<IPaginateResult<TProductDocument>> {
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
      var conditions = { $or: [{ brand: { $regex: search } }, { description: { $regex: search }}]};
      var options = {
        perPage: size,
        page: page,
        lean: true
      };
      let products = await  this.productModel.paginate(conditions, options);
      let productsDto = await this.getProductPriceDtoFormat(products);
      let productsWithDiscount = await this.priceService.applyPalindromeCampaignDiscount(productsDto)

      return this.applyDiscountsProducts(products, productsWithDiscount);
    }
    async getAllProducts(page: number, size: number): Promise<IPaginateResult<TProductDocument>> {
      var conditions = {};
      var options = {
        perPage: size,
        page: page,
        lean: true
      };
      let products = await this.productModel.paginate(conditions, options);
      let productsDto = await this.getProductPriceDtoFormat(products);
      let productsWithDiscount = await this.priceService.applyPalindromeCampaignDiscount(productsDto)

      return this.applyDiscountsProducts(products, productsWithDiscount);
    }
    async getProductById(id: number): Promise<IPaginateResult<TProductDocument>> {
      var options = {
        lean: true
      };
      let products = await this.productModel.paginate({id: id}, options);
      let productsDto = await this.getProductPriceDtoFormat(products);
      let productsWithDiscount = await this.priceService.applyPalindromeCampaignDiscount(productsDto)

      return this.applyDiscountsProducts(products, productsWithDiscount);
    }
    private async getProductPriceDtoFormat(products: IPaginateResult<TProductDocument>): Promise<ProductPriceDto[]> {
      return products.data.map(function(item) {
        let product: ProductPriceDto = new ProductPriceDto();
        product.id = item.id;
        product.price = item.price;
        return product;
      });
    }
    private async applyDiscountsProducts(products: IPaginateResult<TProductDocument>, discounts: ProductPriceDto[]) {
      const productsWithDiscount = await this.priceService.applyPalindromeCampaignDiscount(discounts);

      products.data.forEach(product => {
        let discount = productsWithDiscount.find(x => x.id === product.id);
        product.discount = discount == undefined ? 0 : discount.discount;
        product.discountRate = discount == undefined ? 0 : discount.discountRate;
      });

      return products;
    }
}
