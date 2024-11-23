import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UsersDto {
  @Expose()
  @IsInt()
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  id: number;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'account' })
  account: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'name' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'password' })
  password: string;

  @Expose()
  @IsBoolean()
  @ApiProperty({ example: true })
  @Type(() => Boolean)
  status: boolean;

  @Expose()
  @IsDate()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  created_at: Date;

  @Expose()
  @IsDate()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updated_at: Date;
}
