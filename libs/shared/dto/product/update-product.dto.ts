import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  stock: number;

  @IsString()
  sellerId: string;

  @IsString()
  categoryId: string; // can be ObjectId or category name
}
