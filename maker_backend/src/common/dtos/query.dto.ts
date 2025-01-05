import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class QueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;

  @ApiPropertyOptional({ example: 15 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit: number;

  @ApiPropertyOptional({ example: 'keyword' })
  @IsOptional()
  @IsString()
  search: string;

  @ApiPropertyOptional({ example: 'id' })
  @IsOptional()
  @IsString()
  orderBy: string;

  @ApiPropertyOptional({ example: 'asc' })
  @IsOptional()
  @IsString()
  sortOrder: Prisma.SortOrder;

  @ApiPropertyOptional({ example: 0 })
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(2)
  @Type(() => Number)
  level: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  parent_menu_id: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  menu_type_id: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  parent_id: number;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  type: number;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id: number;
}
