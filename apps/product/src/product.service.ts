import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, productDocument } from './schema/product.schema';
import { isValidObjectId, Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto, UpdateProductDto } from '@library/shared/dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<productDocument>,
    @Inject('CATEGORY_SERVICE') private readonly categoryClient: ClientProxy,
  ) {}

  async addProduct(dto: CreateProductDto): Promise<productDocument> {
    const categoryId = await this.resolveCategory(dto.category);

    const product = new this.productModel({
      ...dto,
      categoryId,
    });

    return await product.save();
  }

  private async resolveCategory(category: string): Promise<string> {
    if (isValidObjectId(category)) {
      const categoryDoc = await firstValueFrom(
        this.categoryClient.send({ cmd: 'findCategoryById' }, category),
      );

      if (!categoryDoc) {
        throw new BadRequestException('Category ID not found');
      }

      return categoryDoc._id;
    } else {
      const categoryDoc = await firstValueFrom(
        this.categoryClient.send({ cmd: 'createCategoryByName' }, category),
      );

      if (!categoryDoc) {
        throw new BadRequestException('Failed to create category name');
      }

      return categoryDoc._id;
    }
  }

  async getProductById(id: string): Promise<productDocument> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user product id format');
    }

    const product = await this.productModel.findOne({ _id: id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async getAllProducts(): Promise<productDocument[]> {
    return await this.productModel.find({});
  }

  async deleteProductById(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid product ID format');
    }

    const product = await this.productModel.findByIdAndDelete(id).exec();

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
  }

  async updateProductById(
    id: string,
    dto: UpdateProductDto,
  ): Promise<productDocument> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid product ID format');
    }

    const categoryId = await this.resolveCategory(dto.category);

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(
        id,
        { ...dto, categoryId },
        {
          new: true,
        },
      )
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return updatedProduct;
  }
}
