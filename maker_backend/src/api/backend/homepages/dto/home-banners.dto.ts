import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class HomeBannersDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  homepage_id: number;

  @ApiProperty({ example: 'image' })
  image: string;

  @ApiProperty({ example: 'image_alt' })
  image_alt: string;

  @ApiProperty({ example: 'title' })
  title: string;

  @ApiProperty({ example: 'subtitle_1' })
  subtitle_1: string;

  @ApiProperty({ example: 'subtitle_2' })
  subtitle_2: string;

  @ApiProperty({ example: 'link' })
  link: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @Type(() => Date)
  created_at: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @Type(() => Date)
  updated_at: Date;
}
