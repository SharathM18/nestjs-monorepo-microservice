import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async findCategoryById(id: string): Promise<CategoryDocument | null> {
    return this.categoryModel.findById(id).exec();
  }

  async createCategoryByName(name: string): Promise<CategoryDocument> {
    const category = new this.categoryModel({ name });
    return await category.save();
  }

  async createCategory() {}
  async getAllCategory() {}
  async updateCategory() {}
  async deleteCategory() {}
  async getCategoryById() {}
  //   add description as a optional
}
