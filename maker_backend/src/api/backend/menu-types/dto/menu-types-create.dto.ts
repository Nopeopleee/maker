import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { MenusCreateDto } from '../../menus/dto/menus-create.dto';

export class MenuTypesCreateDto {
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

  @ApiProperty({ example: Array<MenusCreateDto> })
  menus: MenusCreateDto[];
}
