import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class HomeBannersCreateDto {
  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  homepage_id: number;

  @Expose()
  @ApiProperty({ example: 'image' })
  image: string;

  @Expose()
  @ApiProperty({ example: 'image_alt' })
  image_alt: string;

  @Expose()
  @ApiProperty({ example: 'title' })
  title: string;

  @Expose()
  @ApiProperty({ example: 'subtitle_1' })
  subtitle_1: string;

  @Expose()
  @ApiProperty({ example: 'subtitle_2' })
  subtitle_2: string;

  @Expose()
  @ApiProperty({ example: 'link' })
  link: string;
}
