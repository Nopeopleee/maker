import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';
import { HomeDetailsCreateDto } from './home-details-create.dto';

export class HomepagesCreateDto {
  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  language_id?: number;

  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  menu_id?: number;

  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  type: number;

  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  order: number;

  @Expose()
  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  status: boolean;

  @Expose()
  @ApiProperty({ type: HomeDetailsCreateDto })
  home_details?: HomeDetailsCreateDto;
}
