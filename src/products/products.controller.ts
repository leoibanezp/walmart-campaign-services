import { Controller, Get, Post, Param, Query, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SearchProductsFilterDto } from './dto/search-product-filter.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async getProducts(@Body() filterDto: SearchProductsFilterDto) {
      console.log(filterDto);
      return this.productsService.searchProductsWithFilters(filterDto);
    }
}
