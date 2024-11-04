import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsInt, IsString } from 'class-validator';

export class AdminDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;

  @IsEmail()
  @ApiProperty({ example: 'hiiibackend@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'admin' })
  name: string;

  @Exclude()
  password?: string;

  @IsBoolean()
  @ApiProperty({ example: true })
  status: boolean;

  @IsDate()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  created_at: Date;

  @IsDate()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updated_at: Date;
}
