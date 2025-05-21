import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from '@library/shared/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    const user = await this.authService.register(dto);
    return {
      status: 'success',
      message: 'User registered successfully',
      data: user.user,
      token: user.token,
    };
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.login(dto);
    return {
      status: 'success',
      message: 'User logged in successfully',
      data: user.existingUser,
      token: user.token,
    };
  }
}
