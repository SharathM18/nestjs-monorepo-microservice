import {
  MinLength,
  IsString,
  IsEmail,
  MaxLength,
  Matches,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class RegisterUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'Password must include uppercase, lowercase, number, and special character',
  })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message: 'Role must be admin, seller, or buyer',
  })
  role: UserRole;
}
