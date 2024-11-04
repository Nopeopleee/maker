import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class MenusDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  menu_type_id?: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  parent_menu_id?: number | null;

  @IsString()
  @ApiProperty({ example: 'alias' })
  alias: string;

  @IsString()
  @ApiProperty({ example: 'title' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'link' })
  link?: string;

  @IsInt()
  @ApiProperty({ example: 1 })
  type: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: 1 })
  style?: number;

  @IsInt()
  @ApiProperty({ example: 0 })
  level: number;

  @IsInt()
  @ApiProperty({ example: 0 })
  order: number;

  @IsBoolean()
  @ApiProperty({ example: true })
  status: boolean;

  @IsDate()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  created_at: Date;

  @IsDate()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updated_at: Date;

  @ApiProperty({ type: MenusDto })
  parent_menu?: MenusDto;

  @ApiProperty({ type: [MenusDto] })
  child_menus?: MenusDto[];

  // TODO: cms content
}
