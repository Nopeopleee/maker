import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UsersCreateDto {
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
  @IsOptional()
  status: boolean;
}
