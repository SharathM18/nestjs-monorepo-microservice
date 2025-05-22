import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from '@library/shared/dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('products')
  async addProduct(@Body() dto: CreateProductDto) {
    const product = await this.productService.addProduct(dto);

    return {
      status: 'success',
      message: 'Product added successfully!',
      data: product,
    };
  }

  @Get('products/:id')
  async getProductById(@Param('id') id: string) {
    const product = await this.productService.getProductById(id);
    return {
      status: 'success',
      message: 'Product retrieves successfully!',
      data: product,
    };
  }

  @Get('products')
  async getAllProducts(
    @Query('category') category?: string,
    @Query('sort') sort?: string,
  ) {
    const product = await this.productService.getAllProducts(category, sort);
    return {
      status: 'success',
      message: 'All products retrieves successfully!',
      data: product,
    };
  }

  @Put('products/:id')
  async updateProductById(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    const product = await this.productService.updateProductById(id, dto);
    return {
      status: 'success',
      message: 'Product updated successfully!',
      data: product,
    };
  }

  @Delete('products/:id')
  async deleteProductById(@Param('id') id: string) {
    await this.productService.deleteProductById(id);
    return {
      status: 'success',
      message: 'Product deleted successfully!',
    };
  }
}
