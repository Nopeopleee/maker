import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class AdminCreateDto {
  @IsEmail()
  @ApiProperty({ example: 'hiiibackend@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'admin' })
  name: string;

  @Optional()
  @ApiProperty()
  password?: string;

  @Optional()
  @ApiProperty()
  password_confirmation?: string;

  @IsBoolean()
  @ApiProperty({ example: true })
  @IsOptional()
  status: boolean;
}
