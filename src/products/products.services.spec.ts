import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductSchema } from './schemas/product.schema';
import { PricesService } from '../prices/prices.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsRepository } from './products.repository';
import { ConfigService } from '../config/config.service';
import { CampaignsService } from '../campaigns/campaigns.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../test-utils/mongo/MongooseTestModule';
import { SearchProductFilterDto } from '../dto/search-product-filter.dto';

const mockProductsRepository = () => ({
  findById: jest.fn()
});

const mockPricesService = () => ({
  calculateFinalPriceProducts: jest.fn()
});

describe('ProductsService', () => {
  let productsService;
  let productsRepository;

  beforeEach(async () => {
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
    productsService = await module.get<ProductsService>(ProductsService);
    productsRepository = await module.get<ProductsRepository>(ProductsRepository);
  });
  afterAll(async () => {
    await closeInMongodConnection();
  });
  it('should be defined', () => {
    expect(productsRepository).toBeDefined();
  });
  describe('find', () => {
    it('Get product from repository', async () => {
      let product = new CreateProductDto();
      product.id = 6000;
      product.brand = 'Brand';
      product.description = 'Description';
      product.image = 'http://www.lider.cl/images/product123.png';
      product.price = 35000;

      await productsRepository.create(product);

      const id = 6000;
      const result = await productsService.getProductById(id);
      expect(result.data.length).toEqual(1);
      expect(result.data[0].id).toEqual(id);
      expect(result.data[0].brand).not.toBeNull();
      expect(result.data[0].description).not.toBeNull();
      expect(result.data[0].image).not.toBeNull();
      expect(result.data[0].price).toEqual(35000);
    });
    it('Search for non-existent product', async () => {
      let product = new CreateProductDto();
      product.id = 6000;
      product.brand = 'Brand';
      product.description = 'Description';
      product.image = 'http://www.lider.cl/images/product123.png';
      product.price = 35000;

      await productsRepository.create(product);

      const id = 7000;
      const result = await productsService.getProductById(id);
      expect(result.data.length).toEqual(0);
    });
    it('Get all products', async () => {
      let product = new CreateProductDto();
      product.id = 3000;
      product.brand = 'ooy eqrceli';
      product.description = 'xsjqn wpdqih';
      product.image = 'www.lider.cl/catalogo/images/computerIcon.svg';
      product.price = 619402;

      let product2 = new CreateProductDto();
      product2.id = 2995;
      product2.brand = 'txoemzq';
      product2.description = 'mwnpc avbafq';
      product2.image = 'www.lider.cl/catalogo/images/furnitureIcon.svg';
      product2.price = 401596;

      await productsRepository.create(product);
      await productsRepository.create(product2);

      const page: number = 1;
      const size: number = 10;
      const result = await productsService.getAllProducts(page, size);
      expect(result.data.length).toEqual(2);
      expect(result.data[0].id).toBeGreaterThan(0);
      expect(result.data[0].brand).not.toBeNull();
      expect(result.data[0].description).not.toBeNull();
      expect(result.data[0].image).not.toBeNull();
    });
    it('Get all products with filter and paginate', async () => {
      let product = new CreateProductDto();
      product.id = 3000;
      product.brand = 'ooy eqrceli';
      product.description = 'xsjqn wpdqih';
      product.image = 'www.lider.cl/catalogo/images/computerIcon.svg';
      product.price = 619402;

      let product2 = new CreateProductDto();
      product2.id = 2995;
      product2.brand = 'txoemzq';
      product2.description = 'mwnpc avbafq';
      product2.image = 'www.lider.cl/catalogo/images/furnitureIcon.svg';
      product2.price = 401596;

      let product3 = new CreateProductDto();
      product3.id = 2992;
      product3.brand = 'dssd';
      product3.description = 'itglz fqvnss';
      product3.image = 'www.lider.cl/catalogo/images/furnitureIcon.svg';
      product3.price = 601728;

      await productsRepository.create(product);
      await productsRepository.create(product2);
      await productsRepository.create(product3);

      const page: number = 1;
      const size: number = 2;
      const result = await productsService.getAllProducts(page, size);
      expect(result.data.length).toEqual(2);
      expect(result.data[0].id).toBeGreaterThan(0);
      expect(result.data[0].brand).not.toBeNull();
      expect(result.data[0].description).not.toBeNull();
      expect(result.data[0].image).not.toBeNull();
    });
 });
  describe('search with palindrome', () => {
    it('Get a palindrome discount product corresponding to the id', async () => {
      let product = new CreateProductDto();
      product.id = 101;
      product.brand = 'Brand';
      product.description = 'Description';
      product.image = 'http://www.lider.cl/images/product123.png';
      product.price = 10000;

      await productsRepository.create(product);

      const id: number = 101;

      const result = await productsService.getProductById(id);
      expect(result.data.length).toEqual(1);
      expect(result.data[0].id).toEqual(101);
      expect(result.data[0].price).toEqual(10000);
      expect(result.data[0].discount).toEqual(5000);
      expect(result.data[0].discountRate).toEqual(0.5);
    });
    it('Get a palindrome discount product corresponding to the brand', async () => {
      let product = new CreateProductDto();
      product.id = 2000;
      product.brand = 'dssd';
      product.description = 'itglz fqvnss';
      product.image = 'http://www.lider.cl/images/product123.png';
      product.price = 82000;

      await productsRepository.create(product);

      const search: string = 'dssd';
      const page: number = 1;
      const size: number = 10;

      const result = await productsService.getAllProductsByFilter(search, page, size);
      expect(result.data.length).toEqual(1);
      expect(result.data[0].id).toEqual(2000);
      expect(result.data[0].price).toEqual(82000);
      expect(result.data[0].discount).toEqual(41000);
      expect(result.data[0].discountRate).toEqual(0.5);
    });
    it('Get a palindrome discount product corresponding to the description', async () => {
      let product = new CreateProductDto();
      product.id = 2000;
      product.brand = 'dssd';
      product.description = 'itglz dssd';
      product.image = 'http://www.lider.cl/images/product123.png';
      product.price = 82000;

      await productsRepository.create(product);

      const search: string = 'dssd';
      const page: number = 1;
      const size: number = 10;

      const result = await productsService.getAllProductsByFilter(search, page, size);
      expect(result.data.length).toEqual(1);
      expect(result.data[0].id).toEqual(2000);
      expect(result.data[0].price).toEqual(82000);
      expect(result.data[0].discount).toEqual(41000);
      expect(result.data[0].discountRate).toEqual(0.5);
    });
    it('Search products with a palindrome less than or equal to length 3', async () => {
      let product = new CreateProductDto();
      product.id = 2000;
      product.brand = 'dssd';
      product.description = 'itglz aaa';
      product.image = 'http://www.lider.cl/images/product123.png';
      product.price = 82000;

      await productsRepository.create(product);

      const search: string = 'aaa';
      const page: number = 1;
      const size: number = 10;

      const result = await productsService.getAllProductsByFilter(search, page, size);
      expect(result.data.length).toEqual(1);
      expect(result.data[0].id).toEqual(2000);
      expect(result.data[0].price).toEqual(82000);
      expect(result.data[0].discount).toEqual(0);
      expect(result.data[0].discountRate).toEqual(0);
    });
  });
  describe('search without palindrome', () => {
    it('Get product by id does not correspond to palindrome', async () => {
      let product = new CreateProductDto();
      product.id = 203;
      product.brand = 'Brand';
      product.description = 'Description';
      product.image = 'http://www.lider.cl/images/product123.png';
      product.price = 10000;

      await productsRepository.create(product);

      const id: number = 203;

      const result = await productsService.getProductById(id);
      expect(result.data.length).toEqual(1);
      expect(result.data[0].id).toEqual(203);
      expect(result.data[0].price).toEqual(10000);
      expect(result.data[0].discount).toEqual(0);
      expect(result.data[0].discountRate).toEqual(0);
    });
    it('Get product by brand does not correspond to palindrome', async () => {
      let product = new CreateProductDto();
      product.id = 2000;
      product.brand = 'lg';
      product.description = 'itglz fqvnss';
      product.image = 'http://www.lider.cl/images/product123.png';
      product.price = 41000;

      await productsRepository.create(product);

      const search: string = 'lg';
      const page: number = 1;
      const size: number = 10;

      const result = await productsService.getAllProductsByFilter(search, page, size);
      expect(result.data.length).toEqual(1);
      expect(result.data[0].id).toEqual(2000);
      expect(result.data[0].price).toEqual(41000);
      expect(result.data[0].discount).toEqual(0);
      expect(result.data[0].discountRate).toEqual(0);
    });
  });
});
