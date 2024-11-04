import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt } from 'class-validator';

export class BlockDetailsDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  block_id: number;

  @ApiProperty({ example: 'title' })
  title: string;

  @ApiProperty({ example: 'subtitle' })
  subtitle: string;

  @ApiProperty({ example: 'content' })
  content: string;

  @ApiProperty({ example: 'image' })
  image: string;

  @ApiProperty({ example: 'image_alt' })
  image_alt: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @Type(() => Boolean)
  status: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @Type(() => Date)
  created_at: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @Type(() => Date)
  updated_at: Date;
}
