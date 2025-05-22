import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from '@library/shared/dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async findCategoryById(id: string): Promise<CategoryDocument | null> {
    return await this.categoryModel.findById(id).exec();
  }

  async createCategoryByName(name: string): Promise<CategoryDocument> {
    const category = new this.categoryModel({ name });
    return await category.save();
  }

  async createCategory(dto: CreateCategoryDto): Promise<CategoryDocument> {
    const category = new this.categoryModel(dto);
    return await category.save();
  }

  async getAllCategory(): Promise<CategoryDocument[]> {
    return await this.categoryModel.find({});
  }

  async updateCategory(
    id: string,
    dto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid category ID format');
    }

    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      dto,
      {
        new: true,
      },
    );

    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid category ID format');
    }

    const category = await this.categoryModel.findByIdAndDelete(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }

  async getCategoryById(id: string): Promise<CategoryDocument | null> {
    return await this.categoryModel.findById(id).exec();
  }
}
