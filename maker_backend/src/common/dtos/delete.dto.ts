import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class DeleteDto {
  @IsArray()
  @ApiProperty({ example: [1, 2, 3] })
  ids: number[];
}
