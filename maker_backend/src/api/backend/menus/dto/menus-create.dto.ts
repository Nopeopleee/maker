import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class MenusCreateDto {
  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @Expose()
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  parent_menu_id?: number | null;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'alias' })
  alias: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'title' })
  title: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'link' })
  link?: string;

  @Expose()
  @IsInt()
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  type: number;

  @Expose()
  @IsInt()
  @IsOptional()
  @ApiProperty({ example: 1 })
  style?: number;

  @Expose()
  @IsInt()
  @ApiProperty({ example: 0 })
  @IsOptional()
  level: number;

  @Expose()
  @IsInt()
  @IsOptional()
  @ApiProperty({ example: 0 })
  order?: number;

  @Expose()
  @IsBoolean()
  @ApiProperty({ example: true })
  @IsOptional()
  status: boolean;

  @Expose()
  @ApiProperty({ type: MenusCreateDto })
  parent_menu?: MenusCreateDto;

  @Expose()
  @ApiProperty({ type: [MenusCreateDto] })
  child_menus?: MenusCreateDto[];

  @Expose()
  @ApiProperty({ example: false })
  is_deleted: boolean;

  // TODO: cms content
}
