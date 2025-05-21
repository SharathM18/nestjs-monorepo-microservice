import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type productDocument = Product & Document;

@Schema({ timestamps: true, collection: 'products' })
export class Product {
  @Prop({ required: true, minlength: 3 })
  title: string;

  @Prop({ required: false, minlength: 10 })
  description: string;

  @Prop({ required: true, type: Number, min: 0 })
  stock: number;

  @Prop({ required: true, type: Number, min: 0 })
  price: number;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  sellerId: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  categoryId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
