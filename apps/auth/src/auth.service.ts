import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, RegisterUserDto, UserRole } from '@library/shared/dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    const { username, email, password, role = UserRole.BUYER } = dto;

    const existingUser = await firstValueFrom(
      this.userClient.send({ cmd: 'findUserByEmail' }, email),
    );

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      username,
      email,
      password: hashedPassword,
      role,
    };

    const user = await firstValueFrom(
      this.userClient.send({ cmd: 'createUser' }, userData),
    );

    const payload = {
      sub: user._id,
      username: user.username,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    delete user.password;

    return { user, token };
  }

  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;

    const existingUser = await firstValueFrom(
      this.userClient.send({ cmd: 'findUserByEmail' }, email),
    );

    if (!existingUser) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser?.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid Password');
    }

    const payload = {
      sub: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };

    const token = this.jwtService.sign(payload);

    delete existingUser.password;

    return { existingUser, token };
  }
}
