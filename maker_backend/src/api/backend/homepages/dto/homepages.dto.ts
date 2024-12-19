import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt } from 'class-validator';
import { HomeDetailsDto } from './home-details.dto';

export class HomepagesDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  language_id?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  menu_id?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  type: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  order: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @Type(() => Boolean)
  status: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ type: HomeDetailsDto })
  home_details?: HomeDetailsDto;
}
