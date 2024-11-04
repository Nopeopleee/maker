import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { MenusDto } from '../../menus/dto/menus.dto';

export class MenuTypesDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  language_id?: number;

  @IsString()
  @ApiProperty({ example: 'admin' })
  name: string;

  @IsBoolean()
  @ApiProperty({ example: true })
  status: boolean;

  @IsDate()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  created_at: Date;

  @IsDate()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updated_at: Date;

  @ApiProperty({ example: Array<MenusDto> })
  menus: MenusDto[];
}
