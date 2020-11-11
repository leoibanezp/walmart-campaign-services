import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST /products) search Id with palindrome', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/products')
      .send({ search: '101' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

      expect(body.data[0].id).toEqual(101);
      expect(body.data[0].discount).toEqual(body.data[0].price * body.data[0].discountRate);
  });
  it('/ (POST /products) search Id without palindrome', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/products')
      .send({ search: '100' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

      expect(body.data[0].id).toEqual(100);
      expect(body.data[0].discount).toEqual(0);
      expect(body.data[0].discountRate).toEqual(0);
  });
  it('/ (POST /products) search for non-existent criteria', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/products')
      .send({ search: '7777777777' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

      expect(body.data.length).toEqual(0);
  });
  it('/ (POST /products) search brand with palindrome', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/products')
      .send({ search: 'dssd' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

      expect(body.data.length).toBeGreaterThan(0);

      body.data.forEach(product => {
        expect(product.discount).toEqual(product.price * product.discountRate);
      });
  });
  it('/ (POST /products) search brand without palindrome', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/products')
      .send({ search: 'qoa' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

      expect(body.data.length).toBeGreaterThan(0);

      body.data.forEach(product => {
        expect(product.discount).toEqual(0);
        expect(product.discountRate).toEqual(0);
      });
  });
  it('/ (POST /products) search description with palindrome', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/products')
      .send({ search: 'egjge' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

      expect(body.data.length).toBeGreaterThan(0);

      body.data.forEach(product => {
        expect(product.discount).toEqual(product.price * product.discountRate);
      });
  });
  it('/ (POST /products) search description without palindrome', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/products')
      .send({ search: 'gwisy' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

      expect(body.data.length).toBeGreaterThan(0);

      body.data.forEach(product => {
        expect(product.discount).toEqual(0);
        expect(product.discountRate).toEqual(0);
      });
  });
});
