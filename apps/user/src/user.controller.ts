import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUserDto, UpdateUserDto } from '@library/shared/dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'findUserByEmail' })
  async findUserByEmail(@Payload() email: string) {
    return await this.userService.findUserByEmail(email);
  }

  @MessagePattern({ cmd: 'createUser' })
  async createUser(@Payload() dto: any) {
    return this.userService.createUser(dto);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.userService.updateUser(id, dto);

    return {
      status: 'success',
      message: `User with ID ${id} updated successfully`,
      data: user,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return {
      status: 'success',
      message: `User with id ${id} has been deleted successfully`,
    };
  }

  @Get()
  async getAllUser() {
    const users = await this.userService.getAllUser();
    return {
      status: 'success',
      message: 'All users retrieves successfully!',
      data: users,
    };
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return {
      status: 'success',
      message: 'Users retrieves successfully!',
      data: user,
    };
  }
}
