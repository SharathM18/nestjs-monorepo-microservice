import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'findCategoryById' })
  async findCategoryById(@Payload() id: string) {
    return await this.categoryService.findCategoryById(id);
  }

  @MessagePattern({ cmd: 'createCategoryByName' })
  async createCategoryById(@Payload() name: string) {
    return await this.categoryService.createCategoryByName(name);
  }

  @Post()
  async createCategory() {}

  @Get()
  async getAllCategory() {}

  @Put(':id')
  async updateCategory() {}

  @Delete(':id')
  async deleteCategory() {}

  @Get(':id')
  async getCategoryById() {}
}
