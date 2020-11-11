import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TProductDocument, Product } from '../products/schemas/product.schema';
import { Model, PaginateModel } from 'mongoose';
import { IPaginateResult } from '../common/paginate';
import { CampaignContextDto } from '../dto/campaign-context.dto';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsRepository {

  constructor(
    @InjectModel(Product.name)
    private productModel: PaginateModel<TProductDocument>
  ) { }

  async findAll(page: number, size: number): Promise<IPaginateResult<TProductDocument>> {
    const conditions = {};
    const options = {
      perPage: size,
      page: page,
      lean: true
    };
    return this.productModel.paginate(conditions, options);
  }
  async findById(id: number): Promise<IPaginateResult<TProductDocument>> {
    const conditions = {
      id: id
    };
    const options = {
      lean: true
    };
    return this.productModel.paginate(conditions, options);
  }
  async findByFilter(search: string, page: number, size: number): Promise<IPaginateResult<TProductDocument>> {
    const conditions = { $or: [{ brand: { $regex: search } }, { description: { $regex: search }}]};
    const options = {
      perPage: size,
      page: page,
      lean: true
    };
    return this.productModel.paginate(conditions, options);
  }
  async create(product: CreateProductDto): Promise<TProductDocument> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }
}
