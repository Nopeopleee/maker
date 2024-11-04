import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsInt } from 'class-validator';

export class BlockDetailsCreateDto {
  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  block_id: number;

  @Expose()
  @ApiProperty({ example: 'title' })
  title: string;

  @Expose()
  @ApiProperty({ example: 'subtitle' })
  subtitle: string;

  @Expose()
  @ApiProperty({ example: 'content' })
  content: string;

  @Expose()
  @ApiProperty({ example: 'image' })
  image: string;

  @Expose()
  @ApiProperty({ example: 'image_alt' })
  image_alt: string;

  @Expose()
  @ApiProperty({ example: true })
  @IsBoolean()
  @Type(() => Boolean)
  status: boolean;
}
