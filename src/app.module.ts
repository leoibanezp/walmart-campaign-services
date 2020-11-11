import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CampaignsModule } from './campaigns/campaigns.module';
import { PricesModule } from './prices/prices.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    CampaignsModule,
    PricesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
