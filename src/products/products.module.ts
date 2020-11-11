import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ConfigModule } from '../config/config.module';
import { PricesModule } from '../prices/prices.module';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Product',
      schema: ProductSchema,
    }]),
    ConfigModule,
    PricesModule
  ],
  controllers: [ProductsController],
  providers: [
    ProductsRepository,
    ProductsService
  ],
})
export class ProductsModule {}
