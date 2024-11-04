import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt } from 'class-validator';

export class PreviewsDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'data' })
  data: string;

  @IsDate()
  @ApiProperty({ example: new Date() })
  created_at: Date;

  @IsDate()
  @ApiProperty({ example: new Date() })
  updated_at: Date;
}
