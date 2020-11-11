import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsRepository } from '../products/products.repository';
import { ProductSchema } from './schemas/product.schema';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { ConfigService } from '../config/config.service';
import { CampaignsService } from '../campaigns/campaigns.service';
import { PricesService } from '../prices/prices.service';
import { INestApplication } from '@nestjs/common';
import { closeInMongodConnection, rootMongooseTestModule } from '../test-utils/mongo/MongooseTestModule';

describe('POST /users', async () => {
  let app: INestApplication;
  let productsRepository;

  const module = await Test.createTestingModule({
    imports: [
      rootMongooseTestModule(),
      MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ],
    providers: [
      ProductsService,
      ProductsRepository,
      ConfigService,
      PricesService,
      CampaignsService
    ]
  }).compile();

  app = module.createNestApplication();
  productsRepository = await module.get<ProductsRepository>(ProductsRepository);
  await app.init();

  it('should return an array of users', async () => {
    // Pre-populate the DB with some dummy users
    let product = new CreateProductDto();
    product.id = 101;
    product.brand = 'Brand';
    product.description = 'Description';
    product.image = 'http://www.lider.cl/images/product123.png';
    product.price = 10000;

    // Run your end-to-end test
    const { body } = await supertest.agent(app.getHttpServer())
      .post('/products')
      .send({ search: '101' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body).toEqual([
      { id: expect.any(Number), name: 'test-name-0' },
      { id: expect.any(Number), name: 'test-name-1' },
    ]);
  });
});
