import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  @IsEnum(UserRole, {
    message: 'Role must be admin, seller, or buyer',
  })
  role?: UserRole;
}
