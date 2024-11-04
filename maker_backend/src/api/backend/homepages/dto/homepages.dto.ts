import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt } from 'class-validator';
import { HomeBannersDto } from './home-banners.dto';
import { HomeBlocksDto } from './home-blocks.dto';

export class HomepagesDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  language_id?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  type: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @Type(() => Boolean)
  status: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ type: [HomeBannersDto] })
  home_banners?: HomeBannersDto[];

  @ApiProperty({ type: [HomeBlocksDto] })
  home_blocks?: HomeBlocksDto[];
}
