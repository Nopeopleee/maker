import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class SettingsDto {
  @Expose()
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;

  @Expose()
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  type?: number;

  @Expose()
  @ApiProperty({ example: 'website' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'website' })
  value: string;

  @Expose()
  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  status?: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @IsOptional()
  created_at?: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @IsOptional()
  updated_at?: Date;
}
