import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class HomeDetailsDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  homepage_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  type: number;

  @ApiProperty({ example: 'title' })
  title: string;

  @ApiProperty({ example: 'subtitle' })
  subtitle: string;

  @ApiProperty({ example: 'content_1' })
  content_1: string;

  @ApiProperty({ example: 'content_2' })
  content_2: string;

  @ApiProperty({ example: 'content_3' })
  content_3: string;

  @ApiProperty({ example: 'content_4' })
  content_4: string;

  @ApiProperty({ example: 'content_5' })
  content_5: string;

  @ApiProperty({ example: 'image_1' })
  image_1: string;

  @ApiProperty({ example: 'image_2' })
  image_2: string;

  @ApiProperty({ example: 'image_3' })
  image_3: string;

  @ApiProperty({ example: 'image_4' })
  image_4: string;

  @ApiProperty({ example: 'image_5' })
  image_5: string;

  @ApiProperty({ example: 'link_1' })
  link_1: string;

  @ApiProperty({ example: 'link_2' })
  link_2: string;

  @ApiProperty({ example: 'link_3' })
  link_3: string;

  @ApiProperty({ example: 'link_4' })
  link_4: string;

  @ApiProperty({ example: 'link_5' })
  link_5: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @Type(() => Date)
  created_at: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @Type(() => Date)
  updated_at: Date;
}
