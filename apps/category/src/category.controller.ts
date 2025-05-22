import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCategoryDto, UpdateCategoryDto } from '@library/shared/dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'findCategoryById' })
  async findCategoryById(@Payload() id: string) {
    return await this.categoryService.findCategoryById(id);
  }

  @MessagePattern({ cmd: 'createCategoryByName' })
  async createCategoryByName(@Payload() name: string) {
    return await this.categoryService.createCategoryByName(name);
  }

  @Post()
  async createCategory(@Body() dto: CreateCategoryDto) {
    const category = await this.categoryService.createCategory(dto);

    return {
      status: 'success',
      message: 'Category created successfully!',
      data: category,
    };
  }

  @Get()
  async getAllCategory() {
    const category = await this.categoryService.getAllCategory();
    return {
      status: 'success',
      message: 'All category retrieves successfully!',
      data: category,
    };
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.updateCategory(id, dto);

    return {
      status: 'success',
      message: 'Category updated successfully!',
      data: category,
    };
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);

    return {
      status: 'success',
      message: `Category with id ${id} has been deleted successfully`,
    };
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    const category = await this.categoryService.getCategoryById(id);

    return {
      status: 'success',
      message: 'Category retrieves successfully!',
      data: category,
    };
  }
}
