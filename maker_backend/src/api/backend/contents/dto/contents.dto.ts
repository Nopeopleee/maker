import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { ContentDetailsDto } from './content-details.dto';

export class ContentsDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  menu_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  type: number;

  @ApiProperty({ example: 'alias' })
  @IsString()
  alias: string;

  @ApiProperty({ example: 'title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'text' })
  @IsString()
  text: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @Type(() => Boolean)
  status: boolean;

  @ApiProperty({ example: new Date() })
  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @ApiProperty({ example: new Date() })
  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  @ApiProperty({ example: ContentDetailsDto })
  @Type(() => ContentDetailsDto)
  content_details: ContentDetailsDto;
}
