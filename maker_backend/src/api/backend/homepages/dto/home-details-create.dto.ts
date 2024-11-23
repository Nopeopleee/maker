import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class HomeDetailsCreateDto {
  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  homepage_id: number;

  @Expose()
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  type: number;

  @Expose()
  @ApiProperty({ example: 'title' })
  title: string;

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
  @ApiProperty({ example: 'link' })
  link: string;
}
