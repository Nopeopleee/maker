import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';

export class ContentDetailsCreateDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Expose()
  content_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Expose()
  type: number;

  @ApiProperty({ required: false, example: 'title' })
  @IsString()
  @Expose()
  title?: string;

  @ApiProperty({ required: false, example: 'text' })
  @IsString()
  @Expose()
  text?: string;

  @ApiProperty({ required: false, example: 'image' })
  @IsString()
  @Expose()
  image?: string;

  @ApiProperty({ required: false, example: 'image_alt' })
  @IsString()
  @Expose()
  image_alt?: string;

  @ApiProperty({ required: false, example: 'link' })
  @IsString()
  @Expose()
  link?: string;

  @ApiProperty({ required: false, example: 0 })
  @IsString()
  @Expose()
  order?: number;
}
