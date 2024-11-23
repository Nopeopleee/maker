import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class ContentsCreateDto {
  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  menu_id: number;

  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  type: number;

  @Expose()
  @ApiProperty({ example: 'alias' })
  @IsString()
  @IsOptional()
  alias: string;

  @Expose()
  @ApiProperty({ example: 'title' })
  @IsString()
  title: string;

  @Expose()
  @ApiProperty({ example: 'text' })
  @IsString()
  text: string;

  @Expose()
  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  status: boolean;

  @Expose()
  @ApiProperty({ example: ContentsCreateDto })
  @Type(() => ContentsCreateDto)
  content_details: ContentsCreateDto;
}
