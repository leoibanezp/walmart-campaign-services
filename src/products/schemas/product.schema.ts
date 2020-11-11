import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { mongoosePagination } from "ts-mongoose-pagination";

export type TProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  id: number;

  @Prop()
  brand: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  discount: number;

  discountRate: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product).plugin(mongoosePagination);
