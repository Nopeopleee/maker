import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsInt } from 'class-validator';
import { HomeBannersCreateDto } from './home-banners-create.dto';
import { HomeBlocksCreateDto } from './home-blocks-create.dto';

export class HomepagesCreateDto {
  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  language_id?: number;

  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  type: number;

  @Expose()
  @ApiProperty({ example: true })
  @IsBoolean()
  @Type(() => Boolean)
  status: boolean;

  @Expose()
  @ApiProperty({ type: [HomeBannersCreateDto] })
  home_banners?: HomeBannersCreateDto[];

  @Expose()
  @ApiProperty({ type: [HomeBlocksCreateDto] })
  home_blocks?: HomeBlocksCreateDto[];
}
