import { ApiProperty } from '@nestjs/swagger';

export class PreviewsCreateDto {
  @ApiProperty({ example: 'data' })
  data: string;
}
