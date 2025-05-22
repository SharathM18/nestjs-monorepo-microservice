import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '@library/shared/dto';

// User contains the schema fields
// Document contains _id, timestamps
export type UserDocument = User & Document;

// this schema for db validation
@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true, minlength: 3 })
  username: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.BUYER,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
