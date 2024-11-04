import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class FileDto {
  @ApiProperty({ example: '1' })
  @IsInt()
  id: number;

  @ApiProperty({ example: '貓.jpg' })
  @IsString()
  name: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isDir: boolean;

  @ApiProperty({ example: 1024 })
  @IsInt()
  size: number;

  @ApiProperty({ example: '2021-09-01T00:00:00+08:00' })
  @IsString()
  modDate: string;
}
