import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilePathDto {
  @ApiProperty({ example: 'images' })
  @IsOptional()
  @IsString()
  filePath?: string;

  @ApiProperty({ example: 'images' })
  @IsOptional()
  @IsString()
  oldPath?: string;

  @ApiProperty({ example: 'cut' })
  @IsOptional()
  @IsString()
  action?: string;
}
