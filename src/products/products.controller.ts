import { Controller, Get, Post, Param, Query, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SearchProductFilterDto } from '../dto/search-product-filter.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    @UsePipes(ValidationPipe)
    async getProducts(@Query() filterDto: SearchProductFilterDto) {
      return this.productsService.searchProductsWithFilters(filterDto);
    }
}
