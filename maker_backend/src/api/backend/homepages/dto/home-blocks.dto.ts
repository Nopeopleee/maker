import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { BlockDetailsDto } from './block-details.dto';

export class HomeBlocksDto {
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

  @ApiProperty({ example: 'content' })
  content: string;

  @ApiProperty({ example: 'image' })
  image: string;

  @ApiProperty({ example: 'image_alt' })
  image_alt: string;

  @ApiProperty({ example: 'link' })
  link: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @Type(() => Date)
  created_at: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @Type(() => Date)
  updated_at: Date;

  @ApiProperty({ type: [BlockDetailsDto] })
  block_details: BlockDetailsDto[];
}
