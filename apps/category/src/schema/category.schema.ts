import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true, collection: 'categories' })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
