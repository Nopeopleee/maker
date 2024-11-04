import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class AdminLoginDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  sub: number;

  @IsEmail()
  @ApiProperty({ example: 'hiiibackend@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'admin' })
  name: string;

  @IsString()
  iat: string;

  @IsString()
  exp: string;
}
