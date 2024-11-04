import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class SettingsUpdateDto {
  @ApiProperty({ example: 'value' })
  key: any;
}
